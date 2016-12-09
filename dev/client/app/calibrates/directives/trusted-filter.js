(function () {
  'use strict';

  angular
    .module('calibrates')
    .filter('trusted', ['$sce', function ($sce) {
      return function(url) {
        return $sce.trustAsResourceUrl(url);
      };
    }]);
})();