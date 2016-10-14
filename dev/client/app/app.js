var app = angular.module('plunker', ['ui.router', 'calibrates']);

app.config(function($stateProvider, $urlRouterProvider){

  $urlRouterProvider.when("", "/home");

  $stateProvider
    .state("home", {
      url: "/home",
      templateUrl: "layout/home.html"
    })
    .state("home.list", {
      url: "/list",
      templateUrl: "fixtures/partial-list.html",
      controller: function($scope) {
        $scope.dogs = ['Bernese', 'Husky', 'Goldendoodle'];
      }
    })
    // nested list with just some random string data
    .state('home.paragraph', {
      url: '/paragraph',
      template: 'I could sure use a drink right now.'
    })
    // CALIBRATION
    .state("equipment", {
      url: "/equipment",
      templateUrl: "fixtures/calibration/equipmentList.html",
      controller: 'equipmentCtrl'
    })
    .state("equipmentView", {
      url: "/equipmentView",
      templateUrl: "fixtures/calibration/equipmentView.html"
    })
    .state("equipmentForm", {
      url: "/equipmentForm",
      templateUrl: "fixtures/calibration/equipmentForm.html"
    })
    .state("equipmentRecord", {
      url: "/equipmentRecord",
      templateUrl: "fixtures/calibration/recordForm.html"
    })
    // ABOUT PAGE AND MULTIPLE NAMED VIEWS =================================
    .state('about', {
      url: '/about',
      views: {
        '': { templateUrl: 'fixtures/partial-about.html' },
        'columnOne@about': { template: 'Look I am a column!' },
        'columnTwo@about': {
          templateUrl: 'fixtures/table-data.html',
          controller: 'tableDataCtrl'
        }
      }
    });
});

/*

app.controller('MainCtrl', function($scope) {
  $scope.name = 'World';
});*/
