(function () {
  'use strict';

  var calibratesApp = angular.module('calibrates');

  calibratesApp.controller('EquipmentsListController' , EquipmentsListController);
/*  calibratesApp.controller('EquipmentsCreateController' , EquipmentsCreateController);
  calibratesApp.controller('EquipmentsEditController' , EquipmentsEditController);*/

  EquipmentsListController.$inject = ['$state', 'EquipmentsService', 'DossierService'];

  function EquipmentsListController($state, EquipmentsService, DossierService) {
    var vm = this;
    vm.equipments = EquipmentsService.query();

    vm.remove     = function (data) {
      if(data){
        if(_.has(data, 'asset_id'))
          EquipmentsService.remove(data).$promise.then(function(){
            $state.reload();
          });
        if(_.has(data, 'file_id'))
          DossierService.remove(data).$promise.then(function(){
            $state.reload();
          });
      }
    };
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