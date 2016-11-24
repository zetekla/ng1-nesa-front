let app = angular.module('plunker');
app.controller('tableDataCtrl', tableDataCtrl);

tableDataCtrl.$inject = ['$scope', '$http'];

function tableDataCtrl($scope, $http) {
  $scope.message = 'test';

  $scope.scotches = [
    {
      name: 'Macallan 12',
      price: 50
    },
    {
      name: 'Chivas Regal Royal Salute',
      price: 10000
    },
    {
      name: 'Glenfiddich 1937',
      price: 20000
    }
  ];
}