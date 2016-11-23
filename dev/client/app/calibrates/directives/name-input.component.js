(function () {
  'use strict';

  angular
    .module('calibrates')
    .directive('nameInputComponent', [nameInputComponent]);

  function nameInputComponent(){
    return {
      restrict: "EA",
      scope: false,
      templateUrl: './app/calibrates/views/components/name-input.tpl.html'
    }
  }
})();