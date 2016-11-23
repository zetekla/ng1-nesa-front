(function () {
  'use strict';

  angular
    .module('calibrates')
    .directive('userInteractionInfoComponent', [userInteractionInfoComponent]);

  function userInteractionInfoComponent(){
    return {
      restrict: "EA",
      scope: false,
      templateUrl: './app/calibrates/views/components/user-interaction-info.tpl.html'
    }
  }
})();