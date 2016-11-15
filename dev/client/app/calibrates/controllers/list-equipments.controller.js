(function () {
  'use strict';

  var calibratesApp = angular.module('calibrates');

  calibratesApp.controller('EquipmentsListController' , EquipmentsListController);

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
})();