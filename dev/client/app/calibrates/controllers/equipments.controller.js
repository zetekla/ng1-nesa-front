(function () {
  'use strict';

  // Equipments controller
  angular
    .module('calibrates')
    .controller('EquipmentsController', EquipmentsController);

  EquipmentsController.$inject = ['$scope', '$state', '$window', 'equipmentResolve'];

  function EquipmentsController ($scope, $state, $window, equipment) {
    var vm = this;

    vm.equipment = equipment;

    // vm.pageTitle = $state.current.data.pageTitle;
    vm.error = null;
    vm.form = {};
    vm.remove = remove;
    vm.save = save;

    // Remove existing Equipment
    function remove() {
      if ($window.confirm('Are you sure you want to delete?')) {
        vm.equipment.$remove($state.go('equipments.list'));
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
        $state.go('equipments.view');
      }

      function errorCallback(res) {
        vm.error = res.data.message;
      }
    }
  }
})();