(function () {
  'use strict';

  // Equipments controller
  angular
    .module('calibrates')
    .controller('attributesController', attributesController);

  attributesController.$inject = ['$scope', '$state', '$window', 'attributeResolve'];

  function attributesController ($scope, $state, $window, attribute) {
    var vm = this;
    vm.attribute = attribute;

    console.log('Attribute: ', attribute);

    vm.error = null;
    vm.form = {};
    vm.save = save;
    vm.hideFileUploader = false;

    // Save Equipment
    function save(isValid) {
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.form.attributesForm');
        return false;
      }

      // Create a new article, or update the current instance
      vm.attribute.createOrUpdate()
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