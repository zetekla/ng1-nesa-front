(function () {
  'use strict';

  // Equipments controller
  angular
    .module('calibrates')
    .controller('EquipmentsController', EquipmentsController);

  EquipmentsController.$inject = ['$scope', '$state', '$window', 'equipmentResolve', 'EquipmentsService'];

  function EquipmentsController ($scope, $state, $window, equipment, EquipmentsService) {
    var vm                = this
      , hints = {
          model: [],
          asset_number: [],
          location: []
    };

    vm.equipment          = equipment;

    if (!vm.equipment.asset_id) {
      EquipmentsService.query(function(equipments){
        _.map(equipments, function(equipment){
          hints.model.push(equipment.model);
          hints.asset_number.push(equipment.asset_number);
          hints.location.push(equipment.ECMS_Location.desc);
        });
      });
      console.log(hints);
    }

    // vm.pageTitle       = $state.current.data.pageTitle;
    vm.error              = null;
    vm.form               = {};
    vm.remove             = remove;
    vm.save               = save;
    vm.hideFileUploader   = false;
    vm.hideDossierList    = true;
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


    // Remove existing Equipment
    function remove() {
      if ($window.confirm('Are you sure you want to delete?')) {
        // vm.equipment.slice(clicked element, 1);
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