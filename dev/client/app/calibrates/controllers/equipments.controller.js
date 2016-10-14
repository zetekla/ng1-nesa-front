(function () {
  'use strict';

  // Equipments controller
  angular
    .module('calibrates')
    .controller('EquipmentsController', EquipmentsController);

  EquipmentsController.$inject = ['$scope', '$state', 'equipmentResolve'];

  function EquipmentsController ($scope, $state, equipment) {
    var vm = this;

    vm.equipment = equipment;
    vm.error = null;
    vm.form = {};
    vm.remove = remove;
    vm.save = save;

    // Remove existing Equipment
    function remove() {
      if (confirm('Are you sure you want to delete?')) {
        vm.equipment.$remove($state.go('equipments.list'));
      }
    }

    // Save Equipment
    function save(isValid) {
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.form.equipmentForm');
        return false;
      }

      // TODO: move create/update logic to service
      if (vm.equipment._id) {
        vm.equipment.$update(successCallback, errorCallback);
      } else {
        vm.equipment.$save(successCallback, errorCallback);
      }

      function successCallback(res) {
        $state.go('equipments.view', {
          equipmentId: res._id
        });
      }

      function errorCallback(res) {
        vm.error = res.data.message;
      }
    }
  }
})();