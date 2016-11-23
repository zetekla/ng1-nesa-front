(function () {
  'use strict';

  angular
    .module('calibrates')
    .directive('viewActionsComponent', [viewActionsComponent]);

  function viewActionsComponent(){
    return {
      restrict: "EA",
      scope: false,
      templateUrl: './app/calibrates/views/components/view-actions.tpl.html'
    }
  }
})();