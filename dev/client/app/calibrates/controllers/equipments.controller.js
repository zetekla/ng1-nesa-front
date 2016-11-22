(function () {
  'use strict';

  // Equipments controller
  angular
    .module('calibrates')
    .controller('EquipmentsController', EquipmentsController);

  EquipmentsController.$inject = ['$scope', '$state', '$window', 'equipmentResolve', 'EquipmentsService'];

  function EquipmentsController ($scope, $state, $window, equipment, Service) {
    var vm                = this;
    vm.equipment          = equipment;
    vm.state              = $state.params;
    vm.searchText         = false;

    if (!vm.equipment.asset_id) {
      var equipments = Service.query().$promise;

      equipments.then(function(equipments){
        vm.hints = { model: [], asset_number: [], location: [] };
        var asset_numbers = [], locations = [];

        _.map(equipments, function(equipment){
          vm.hints.model.push(equipment.model);
          vm.hints.asset_number.push(equipment.asset_number);
          vm.hints.location.push(equipment.ECMS_Location.desc);
        });

        vm.hints.model    = _.uniq(vm.hints.model);
        vm.hints.location = _.uniq(vm.hints.location);

        $scope.$watch('vm.equipment.model', function(newVal, oldVal){
          if (newVal!==oldVal) vm.hints.asset_number = [];
          asset_numbers = vm.hints.asset_number = _(equipments).chain().filter({'model' : newVal}).map('asset_number').uniq().value();
        });

        $scope.$watch('vm.equipment.asset_number', function(newVal, oldVal){
          if(newVal !== oldVal){
            locations = _(equipments).chain().filter({'model' : vm.equipment.model, 'asset_number': newVal}).map('ECMS_Location.desc').uniq().value();

            vm.locationDisabled = !!_.includes(asset_numbers, newVal);
            vm.equipment.ECMS_Location.desc = vm.locationDisabled ? locations[0] : '';
          }
        });
      });
    }

    // vm.pageTitle       = $state.current.data.pageTitle;
    vm.error              = null;
    vm.form               = {};
    vm.remove             = remove;
    vm.save               = save;

    vm.hideDossierList    = false;

    vm.hideFileUploader   = false;

    vm.useFileUploader    = true;
    var usePlaceHolder    = true,
        useRandomized     = true;

    if(vm.useFileUploader)
    $scope.$watch('vm.incrementer', function(newVal, oldVal){
      var element = angular.element( document.querySelector( '#documentID' ) );
      element.remove();
      if (newVal){
        vm.equipment.documents = [];
        _.times(newVal, function(){
          var int = (useRandomized) ? (_.random(1,100)): (vm.equipment.documents.length+1),
            file  = (usePlaceHolder) ? 'placeholder'+ int : null;
          return vm.equipment.documents.push({file: file, filename: file});
        });
      }
    });

    // look, I'm another set of data to inject
    $scope.marvels = [
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



    // Remove existing Equipment
    function remove() {
      if ($window.confirm('Are you sure you want to delete?')) {
        vm.equipment.$remove({}, function(){
          $state.go('equipments.list');
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
        console.log('SUCCESS!');
        $state.go('equipments.view', {asset_id: res.asset_id});
      }

      function errorCallback(res) {
        vm.error = res.data.message;
      }
    }
  }
})();