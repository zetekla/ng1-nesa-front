(function () {
  'use strict';

  // Dossiers controller
  angular
    .module('calibrates')
    .controller('DossiersController', DossiersController);

  DossiersController.$inject = ['$scope', '$state', '$window', 'dossierResolve'];

  function DossiersController ($scope, $state, $window, dossier) {
    var vm = this;
    vm.equipment = dossier; // dossier.$resolve(function(data){  }) ;
    vm.state = $state.params;

    vm.error = null;
    vm.form = {};
    vm.remove = remove;
    vm.save = save;

    // Remove existing Dossier
    function remove() {
      if ($window.confirm('Are you sure you want to delete this Dossier?')) {
        var asset_id = vm.equipment.asset_id;
        vm.equipment.$remove({file_id: vm.equipment.ECMS_Attributes[0].file_id}, function(){
          $state.go('equipments.view', {asset_id: asset_id});
        });
      }
    }

    // Save Dossier
    function save(isValid) {
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.form.dossiersForm');
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