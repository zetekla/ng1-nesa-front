(function () {
  'use strict';

  // Equipments controller
  angular
    .module('calibrates')
    .controller('DossiersController', DossiersController);

  DossiersController.$inject = ['$scope', '$state', '$window', 'dossierResolve'];

  function DossiersController ($scope, $state, $window, dossier) {
    var vm = this;
    vm.dossier = dossier;

    console.log('Dossier: ', dossier);
    // dossier.$resolve(function(data){  }) ;


    vm.error = null;
    vm.form = {};
    vm.remove = remove;
    vm.save = save;
    vm.hideFileUploader = false;

    // Remove existing Equipment
    function remove() {
      if ($window.confirm('Are you sure you want to delete this Dossier?')) {
        vm.dossier.$remove($state.go('equipments.view', {asset_id: dossier.asset_id}));
      }
    }

    // Save Equipment
    function save(isValid) {
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.form.dossiersForm');
        return false;
      }

      // Create a new article, or update the current instance
      vm.dossier.createOrUpdate()
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