(function () {
  'use strict';

let app = angular.module('plunker', ['ngFileUpload', 'ngImgCrop', 'ui.bootstrap', 'ui.router', 'ngSanitize',  'calibrates']);
    app.config(routeConfig);

app.value('customValue', 'The value recipe');
app.provider('version', function(){
  let version, movie;
  return {
    setVersion: ver => version = ver,
    $get: function () {
      return {
        title: 'The nesa1 v.' + version,
        movie: 'The show this week is ' + movie
      }
    },
    setMovie: mov => movie = mov
  }
});

String.prototype.re = function(pattern){
  pattern = (typeof pattern ==='string') ? new RegExp(pattern) : pattern;
  return pattern.test(this);
};

routeConfig.$inject = ['$stateProvider', '$urlRouterProvider', 'versionProvider'];

function routeConfig($stateProvider, $urlRouterProvider, versionProvider){
  versionProvider.setVersion('v.1.5.1');
  versionProvider.setMovie('FastNFurious!');
  $urlRouterProvider.when('', '/home');

  $stateProvider
    .state('home', {
      url: '/home',
      templateUrl: './app/layout/home.html'
    })
    .state('home.list', {
      url: '/list',
      templateUrl: './app/fixtures/partial-list.html',
      controller: function($scope, $http) {
        $scope.dogs = ['Bernese', 'Husky', 'Goldendoodle'];

        $scope.userProfiles = [];
        $http.get('/app/server-data/mock-data.json').then(res =>
          _(res.data).chain().map('name').forEach(user => $scope.userProfiles.push({name: user.first + ' ' + user.last})).value()
        );

        $scope.selected = undefined;
        $scope.states = [
          'Alabama',
          'Alaska',
          'Arizona',
          'Arkansas',
          'California',
          'Colorado',
          'Connecticut',
          'Delaware',
          'Florida',
          'Georgia',
          'Hawaii',
          'Idaho',
          'Illinois',
          'Indiana',
          'Iowa',
          'Kansas',
          'Kentucky',
          'Louisiana',
          'Maine',
          'Maryland',
          'Massachusetts',
          'Michigan',
          'Minnesota',
          'Mississippi',
          'Missouri',
          'Montana',
          'Nebraska',
          'Nevada',
          'New Hampshire',
          'New Jersey',
          'New Mexico',
          'New York',
          'North Dakota',
          'North Carolina',
          'Ohio',
          'Oklahoma',
          'Oregon',
          'Pennsylvania',
          'Rhode Island',
          'South Carolina',
          'South Dakota',
          'Tennessee',
          'Texas',
          'Utah',
          'Vermont',
          'Virginia',
          'Washington',
          'West Virginia',
          'Wisconsin',
          'Wyoming'
        ];
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

})();
/*
app.controller('MainCtrl', function($scope) {
  $scope.name = 'World';
});*/
