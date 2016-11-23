(function () {
  'use strict';

  angular
    .module('calibrates')
    .directive('filePaneComponent', [filePaneComponent]);

  function filePaneComponent(){
    return {
      restrict: "EA",
      scope: false,
      templateUrl: './app/calibrates/views/components/file-pane.tpl.html'
    }
  }
})();