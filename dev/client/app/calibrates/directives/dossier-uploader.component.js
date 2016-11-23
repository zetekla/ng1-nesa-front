(function () {
  'use strict';

  angular
    .module('calibrates')
    .directive('dossierUploaderComponent', [dossierUploaderComponent]);

  function dossierUploaderComponent(){
    return {
      restrict: "EA",
      scope: false,
      templateUrl: './app/calibrates/views/components/dossier-uploader.tpl.html'
    }
  }
})();