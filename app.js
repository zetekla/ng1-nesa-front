var app = angular.module('plunker', ['ui.router']);

app.config(function($stateProvider, $urlRouterProvider){

  $urlRouterProvider.when("", "/PageTab");

  $stateProvider
    .state("PageTab", {
      url: "/PageTab",
      templateUrl: "dev/client/app/layout/PageTab.html"
    })
    .state("PageTab.Page1", {
      url: "/Page1",
      templateUrl: "dev/client/app/fixtures/Page1.html"
    })
    .state("PageTab.Page2", {
      url: "/Page2",
      templateUrl: "dev/client/app/fixtures/Page2.html"
    })
    .state("PageTab.Page3", {
      url: "/Page3",
      templateUrl: "dev/client/app/fixtures/Page3.html"
    });
});

/*

app.controller('MainCtrl', function($scope) {
  $scope.name = 'World';
});*/
