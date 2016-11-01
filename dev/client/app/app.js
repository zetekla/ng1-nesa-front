var app = angular.module('plunker', ['ui.router', 'calibrates']);
    app.config(CalibratesRouteConfig);


CalibratesRouteConfig.$inject = ['$stateProvider', '$urlRouterProvider'];

function CalibratesRouteConfig($stateProvider, $urlRouterProvider){

  $urlRouterProvider.when('', '/home');

  $stateProvider
    .state('home', {
      url: '/home',
      templateUrl: './app/layout/home.html'
    })
    .state('home.list', {
      url: '/list',
      templateUrl: './app/fixtures/partial-list.html',
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
    .state('equipmentForm', {
      url: '/equipmentForm',
      templateUrl: './app/calibrates/views/form-equipment.html'
    })
    .state('equipmentRecord', {
      url: '/equipmentRecord',
      templateUrl: './app/fixtures/calibration/recordForm.html'
    })
    // ABOUT PAGE AND MULTIPLE NAMED VIEWS =================================
    .state('about', {
      url: '/about',
      views: {
        '': { templateUrl: './app/fixtures/partial-about.html' },
        'columnOne@about': { template: 'Look I am a column!' },
        'columnTwo@about': {
          templateUrl: './app/fixtures/table-data.html',
          controller: 'tableDataCtrl'
        }
      }
    });
}

/*

app.controller('MainCtrl', function($scope) {
  $scope.name = 'World';
});*/
