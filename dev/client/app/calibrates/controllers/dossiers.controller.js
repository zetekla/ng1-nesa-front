(function () {
  'use strict';

  // Dossiers controller
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

    // Remove existing Dossier
    function remove() {
      if ($window.confirm('Are you sure you want to delete this Dossier?')) {
        var asset_id = vm.dossier.asset_id;
        vm.dossier.$remove({file_id: vm.dossier.ECMS_Attributes[0].file_id}, function(){
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