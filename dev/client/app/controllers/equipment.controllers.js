var app = angular.module('plunker');

app.controller('equipmentCtrl', function($scope, $http) {
  var display = this,
    uri = 'http://localhost:3000/equipment';


  $http.get(uri)
    .then(function(response){
      display.equipments = response.data.calibrates;
    });
});