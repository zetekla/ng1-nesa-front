(function () {
  'use strict';

  // Equipments controller
  angular
    .module('calibrates')
    .controller('fichiersController', fichiersController);

  fichiersController.$inject = ['$scope', '$state', '$window', 'fichierResolve'];

  function fichiersController ($scope, $state, $window, fichier) {
    var vm = this;
    vm.fichier = fichier;

    console.log('Fichier: ', fichier);

    vm.error = null;
    vm.form = {};
    vm.save = save;
    vm.hideFileUploader = false;

    // Save Equipment
    function save(isValid) {
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.form.fichiersForm');
        return false;
      }

      // Create a new article, or update the current instance
      vm.fichier.createOrUpdate()
        .then(successCallback)
        .catch(errorCallback);

      function successCallback(res) {
        // $state.go('equipments.view', {asset_id: res.asset_id});
      }

      function errorCallback(res) {
        vm.error = res.data.message;
      }
    }
  }
})();