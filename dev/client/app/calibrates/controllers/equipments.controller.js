(function () {
  'use strict';

  // Equipments controller
  angular
    .module('calibrates')
    .controller('EquipmentsController', EquipmentsController);

  EquipmentsController.$inject = ['$scope', '$state', '$window', 'equipmentResolve'];

  function EquipmentsController ($scope, $state, $window, equipment) {
    var vm                = this;

    vm.equipment          = equipment;

    // vm.pageTitle       = $state.current.data.pageTitle;
    vm.error              = null;
    vm.form               = {};
    vm.remove             = remove;
    vm.save               = save;
    vm.hideFileUploader   = false;
    vm.hideFichierList    = true;
    vm.useFileUploader    = true;

    if(vm.useFileUploader)
    $scope.$watch('vm.incrementer', function(newVal, oldVal){
      var element = angular.element( document.querySelector( '#documentID' ) );
      element.remove();
      if (newVal){
        vm.equipment.documents = [];
        _.times(newVal, function(){
          return vm.equipment.documents.push({file: 'placeholder'+(vm.equipment.documents.length+1)});
        });
      }
    });

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
        $state.go('equipments.view', {asset_id: res.asset_id});
      }

      function errorCallback(res) {
        vm.error = res.data.message;
      }
    }
  }
})();