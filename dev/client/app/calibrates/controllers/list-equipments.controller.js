(function () {
  'use strict';

  let calibratesApp = angular.module('calibrates');

  calibratesApp.controller('EquipmentsListController' , EquipmentsListController);

  EquipmentsListController.$inject = ['EquipmentsService', 'RecordService'];

  function EquipmentsListController(EquipmentsService, RecordService) {
    let vm = this;
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

    vm.remove = record => RecordService.remove(record);
  }
})();