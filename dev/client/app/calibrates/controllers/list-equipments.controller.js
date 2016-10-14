var app = angular.module('calibrates', []);

app.controller('equipmentCtrl', function($scope, RestfulService) {
  var display = this,
    uri = {
      equipment: 'http://localhost:3000/equipment'
    };

  RestfulService.getEquipment(uri.equipment,
    function (res) {
      display.equipments = res.data.calibrates;
    },
    function (err) {
      console.dir(err);
    }
  );


});