(function () {
  'use strict';

  angular
    .module('calibrates')
    .directive('uploaderMockupComponent', [uploaderMockupComponent]);

  function uploaderMockupComponent(){
    return {
      restrict: "EA",
      scope: false,
      templateUrl: './app/calibrates/views/components/uploader-mockup.tpl.html'
    }
  }
})();