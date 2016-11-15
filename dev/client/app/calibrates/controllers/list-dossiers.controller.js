(function () {
  'use strict';

  var calibratesApp = angular.module('calibrates');

  calibratesApp.controller('DossiersListController' , DossiersListController);

  DossiersListController.$inject = ['DossiersService'];

  function DossiersListController(DossiersService) {
    var vm = this;
    vm.dossiers = DossiersService.query();
  }

})();