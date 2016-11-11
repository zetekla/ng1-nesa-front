(function () {
  'use strict';

  // Equipments controller
  angular
    .module('calibrates')
    .controller('FichiersController', FichiersController);

  FichiersController.$inject = ['$scope', '$state', '$window', 'fichierResolve'];

  function FichiersController ($scope, $state, $window, fichier) {
    var vm = this;
    vm.fichier = fichier;

    console.log('Fichier: ', fichier);
    // fichier.$resolve(function(data){  }) ;


    vm.error = null;
    vm.form = {};
    vm.remove = remove;
    vm.save = save;
    vm.hideFileUploader = false;

    // Remove existing Equipment
    function remove() {
      if ($window.confirm('Are you sure you want to delete?')) {
        vm.fichier.$remove($state.go('equipments.list'));
      }
    }

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
        $state.go('equipments.view', {asset_id: res.asset_id});
      }

      function errorCallback(res) {
        vm.error = res.data.message;
      }
    }
  }
})();