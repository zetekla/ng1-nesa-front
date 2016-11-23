(function () {
  'use strict';

  angular
    .module('calibrates')
    .directive('dossiersListViewComponent', [dossiersListViewComponent]);

  function dossiersListViewComponent(){
    return {
      restrict: "EA",
      scope: false,
      templateUrl: './app/calibrates/views/components/dossiers-list-view.tpl.html'
    }
  }
})();