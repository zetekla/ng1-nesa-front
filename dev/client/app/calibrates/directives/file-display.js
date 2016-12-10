(function () {
  'use strict';

  angular
    .module('calibrates')
    .directive('fileDisplay', ['$compile', 'UtilityService',
      function ($compile, UtilityService) {
        return {
          scope:{
            dossier: '<'
          },
          restrict: 'EA',
          link: function (scope, element, attrs) {

            UtilityService.templateGenerator(scope.dossier);

            element.html(scope.dossier.template, scope.dossier.file_id);
            $compile(element.contents())(scope);
            // console.log(scope,element, attrs);

          },
          controllerAs: 'ctrl',
          controller: function () {
            this.$onInit = function() {
              this.download = function (file) {
                window.open(file);
              };
            };
            // console.log(this);
          }
        };
      }
    ]);
})();