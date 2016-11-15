(function () {
  'use strict';

  var calibratesApp = angular.module('calibrates');

  calibratesApp.controller('EquipmentsListController' , EquipmentsListController);

  EquipmentsListController.$inject = ['$state', 'EquipmentsService', 'DossiersService'];

  function EquipmentsListController($state, EquipmentsService, DossiersService) {
    var vm = this;
    vm.equipments = EquipmentsService.query();

    vm.remove     = function (record) {
      if(record){
        if(_.has(record, 'asset_id'))
          EquipmentsService.remove(record).$promise.then(function(){
            $state.reload();
          });
        if(_.has(record, 'file_id'))
          DossiersService.remove(record).$promise.then(function(){
            $state.reload();
          });
      }
    };
  }
})();