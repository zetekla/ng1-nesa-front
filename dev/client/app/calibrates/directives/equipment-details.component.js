(function () {
  'use strict';

  angular
    .module('calibrates')
    .directive('equipmentDetailsComponent', [equipmentDetailsComponent]);

  function equipmentDetailsComponent(){
    return {
      restrict: "EA",
      scope: false,
      templateUrl: './app/calibrates/views/components/equipment-details.tpl.html'
    }
  }
})();