(function () {
  'use strict';

  angular
    .module('calibrates')
    .directive('formActionsComponent', [formActionsComponent]);

  function formActionsComponent(){
    return {
      restrict: "EA",
      scope: false,
      templateUrl: './app/calibrates/views/components/form-actions.tpl.html'
    }
  }
})();