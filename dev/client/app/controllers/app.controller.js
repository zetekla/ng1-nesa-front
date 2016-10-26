var app = angular.module('plunker');
app.controller('MainCtrl', MainCtrl);

MainCtrl.$inject = ['$scope'];

function MainCtrl($scope) {
  $scope.name = 'World';
}