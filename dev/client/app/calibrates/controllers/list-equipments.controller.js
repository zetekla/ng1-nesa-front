(function () {
  'use strict';

  var calibratesApp = angular.module('calibrates');

  calibratesApp.controller('EquipmentsListController' , EquipmentsListController);
/*  calibratesApp.controller('EquipmentsCreateController' , EquipmentsCreateController);
  calibratesApp.controller('EquipmentsEditController' , EquipmentsEditController);*/

  EquipmentsListController.$inject = ['EquipmentsService'];

  function EquipmentsListController(EquipmentsService) {
    var vm = this;
    vm.equipments = EquipmentsService.query();
  }

  /*
  EquipmentsCreateController.$inject = ['EquipmentsService'];

  function EquipmentsCreateController(EquipmentsService) {
    var vm = this;

    vm.equipments = EquipmentsService.query();
  }

  EquipmentsEditController.$inject = ['EquipmentsService'];

  function EquipmentsEditController(EquipmentsService) {
    var vm = this;

    vm.equipments = EquipmentsService.get((data) => {
      vm.equipments = data.calibrates;
      console.log(equipments);
    })
  }*/
})();