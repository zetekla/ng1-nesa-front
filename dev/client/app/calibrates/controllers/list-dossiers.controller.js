(function () {
  'use strict';

  let calibratesApp = angular.module('calibrates');

  calibratesApp.controller('DossiersListController' , DossiersListController);

  DossiersListController.$inject = ['DossiersService'];

  function DossiersListController(DossiersService) {
    let vm = this;
    vm.dossiers = DossiersService.query();
  }

})();