(function () {
  'use strict';

  var calibratesApp = angular.module('calibrates');

  calibratesApp.controller('FichiersListController' , FichiersListController);

  FichiersListController.$inject = ['FichierService'];

  function FichiersListController(FichierService) {
    var vm = this;
    vm.fichiers = FichierService.query();
    // console.log(vm.fichiers);
  }

})();