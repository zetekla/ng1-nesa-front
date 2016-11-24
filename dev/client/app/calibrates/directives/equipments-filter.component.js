(function () {
  'use strict';

  angular
    .module('calibrates')
    .directive('equipmentsFilterComponent', [equipmentsFilterComponent]);

  function equipmentsFilterComponent(){
    return {
      restrict: "EA",
      scope: false,
      templateUrl: './app/calibrates/views/components/equipments-filter.tpl.html'
    }
  }
})();