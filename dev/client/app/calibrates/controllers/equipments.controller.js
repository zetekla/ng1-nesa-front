(function () {
  'use strict';

  // Equipments controller
  angular
    .module('calibrates')
    .controller('EquipmentsController', EquipmentsController);

  EquipmentsController.$inject = ['$scope', '$state', '$window', 'equipmentResolve', 'EquipmentsService', 'RecordService'];

  function EquipmentsController ($scope, $state, $window, equipment, Service, RecordService) {
    let vm                = this;
    vm.equipment          = equipment;
    vm.state              = $state.params;
    vm.searchText         = false;
    vm.locationDisabled   = false;
    vm.statusAlert        = null;
    vm.asset_status       = null;

    if (!vm.equipment.asset_id) {
      let equipments = Service.query().$promise;

      equipments.then(function(equipments){
        vm.hints = { model: [], asset_number: [], location: [] };
        let asset_numbers = [], locations = [], other_asset_numbers;

        _.map(equipments, function(equipment){
          vm.hints.model.push(equipment.model);
          vm.hints.asset_number.push(equipment.asset_number);
          vm.hints.location.push(equipment.ECMS_Location.desc);
        });

        vm.hints.model    = _.uniq(vm.hints.model);
        vm.hints.location = _.uniq(vm.hints.location);

        $scope.$watch('vm.equipment.model', function(newVal, oldVal){
          if (newVal!==oldVal) {
            vm.hints.asset_number     = [];
            vm.equipment.asset_number = '';
          }

          asset_numbers = vm.hints.asset_number = _(equipments).chain().filter({'model' : newVal}).map('asset_number').uniq().value();
          other_asset_numbers = _(equipments).chain().reject({'model' : newVal}).map('asset_number').uniq().value();
        });

        $scope.$watch('vm.equipment.asset_number', function(newVal, oldVal){
          vm.asset_status = null;
          vm.statusAlert  = null;

          if(newVal !== oldVal){

            if(_.includes(asset_numbers, newVal)) vm.asset_status = '(existing)';
            else if(_.includes(other_asset_numbers, newVal)) vm.asset_status = '(used)';
            else vm.asset_status = '(new)';


            let filteredEquipments = _(equipments).chain().filter({'model' : vm.equipment.model, 'asset_number': newVal}).value();

            locations = _(filteredEquipments).chain().map('ECMS_Location.desc').uniq().value();

            if(filteredEquipments.length)
            if (_(filteredEquipments[0]).chain().get('ECMS_Dossiers').size().value()) {
              let dossiers    = _(filteredEquipments[0]).chain().get('ECMS_Dossiers').orderBy(['file_id'], ['desc']).value();
              // let last_indexed_dossier = _(dossiers).chain().max(['file_id']).value();
              let last_indexed_dossier = dossiers[0];

              vm.equipment.last_cal = last_indexed_dossier.createdAt;
              vm.statusAlert = 'statusAlert';

              /* console.log(dossiers, last_indexed_dossier);*/
            }

            vm.locationDisabled = !!_.includes(asset_numbers, newVal);
            vm.equipment.ECMS_Location = {
              desc: vm.locationDisabled ? locations[0] : ''
            };
          }
        });
      });
    }

    // vm.pageTitle       = $state.current.data.pageTitle;
    vm.error              = null;
    vm.form               = {};
    vm.remove             = remove;
    vm.dossierRemove      = record => RecordService.remove(record);
    vm.save               = save;

    // Remove existing Equipment
    function remove() {
      if ($window.confirm('Are you sure you want to delete this Equipment?')) {
        vm.equipment.$remove({}, function(){
          $state.go('calibration.list');
        });
      }
    }

    // Save Equipment
    function save(isValid) {
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.form.equipmentForm');
        return false;
      }

      // Create a new article, or update the current instance
      vm.equipment.createOrUpdate()
        .then(successCallback)
        .catch(errorCallback);

      function successCallback(res) {
        return $state.go('calibration.view', {asset_id: res.asset_id});
      }

      function errorCallback(res) {
        return vm.error = res.data.message;
      }
    }


    /* HEROES LIST COMPONENT */
    // look, I'm another set of data to inject
    $scope.pref   = 1;
    $scope.kaban = [
      {
        "name": "Spider-Man",
        "attribute": "agile tactic",
        "present": "chapter 67"
      },
      {
        "name": "Daredevil",
        "attribute": "mystic hypnotization",
        "present": "chapter 45"
      },
      {
        "name": "Thor",
        "attribute": "thunder bolt",
        "present": "chapter 32"
      },
      {
        "name": "Rogue",
        "attribute": "physical swiftness",
        "present": "chapter 4"
      },
      {
        "name": "Phoenix",
        "attribute": "fire element, fire ball",
        "present": "chapter 6"
      },
      {
        "name": "Psylocke",
        "attribute": "psychic",
        "present": "chapter 9"
      }
    ];

  }
})();