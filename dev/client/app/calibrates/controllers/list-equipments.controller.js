(function () {
  'use strict';

  var calibratesApp = angular.module('calibrates');

  calibratesApp.controller('EquipmentsListController' , EquipmentsListController);

  EquipmentsListController.$inject = ['$state', 'EquipmentsService', 'DossiersService'];

  function EquipmentsListController($state, EquipmentsService, DossiersService) {
    var vm = this;
    vm.equipments = EquipmentsService.query();

    vm.equipments.$promise.then(function(equipments){
      if (equipments) {
        _.forEach(equipments, function(equipment){
          if (_(equipment).chain().get('ECMS_Dossiers').size().value()){
            equipment.ECMS_Dossiers = _.orderBy(equipment.ECMS_Dossiers, ['time_field'], ['desc']);
          }
        });

        vm.equipments = equipments;
      }
    });

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