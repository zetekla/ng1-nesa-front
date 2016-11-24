(function () {
  'use strict';

  angular
    .module('calibrates')
    .directive('templateFormComponent', [templateFormComponent]);

  function templateFormComponent(){
    return {
      restrict: "EA",
      scope: false,
      templateUrl: './app/calibrates/views/components/template-form.tpl.html'
    }
  }
})();