(function () {
  'use strict';

  var calibratesApp = angular.module('calibrates');

  calibratesApp.controller('DossiersListController' , DossiersListController);

  DossiersListController.$inject = ['DossierService'];

  function DossiersListController(DossierService) {
    var vm = this;
    vm.dossiers = DossierService.query();
  }

})();