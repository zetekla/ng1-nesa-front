(function () {
  'use strict';

  // Equipments controller
  angular
    .module('calibrates')
    .controller('assetFilesController', assetFilesController);

  assetFilesController.$inject = ['$scope', '$state', '$window', 'equipmentResolve'];

  function assetFilesController ($scope, $state, $window, equipment) {
    var vm = this;
    vm.equipment = equipment;

    vm.error = null;
    vm.form = {};
    vm.save = save;
    vm.hideFileUploader = false;

    // Save Equipment
    function save(isValid) {
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.form.assetFilesForm');
        return false;
      }

      // Create a new article, or update the current instance
      vm.equipment.createOrUpdate()
        .then(successCallback)
        .catch(errorCallback);

      function successCallback(res) {
        $state.go('equipments.view', {asset_id: res.asset_id});
      }

      function errorCallback(res) {
        vm.error = res.data.message;
      }
    }
  }
})();