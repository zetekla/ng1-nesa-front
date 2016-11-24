(function () {
  'use strict';

  angular
    .module('calibrates')
    .directive('equipmentsListComponent', [equipmentsListComponent]);

  function equipmentsListComponent(){
    return {
      restrict: "EA",
      scope: false,
      templateUrl: './app/calibrates/views/components/equipments-list.tpl.html'
    }
  }
})();