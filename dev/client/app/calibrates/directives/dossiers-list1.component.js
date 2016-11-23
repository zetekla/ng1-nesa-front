(function () {
  'use strict';

  angular
    .module('calibrates')
    .directive('dossiersList1Component', [dossiersList1Component]);

  function dossiersList1Component(){
    return {
      restrict: 'EA',
      scope: false,
      templateUrl: './app/calibrates/views/components/dossiers-list1.tpl.html'
    }
  }
})();