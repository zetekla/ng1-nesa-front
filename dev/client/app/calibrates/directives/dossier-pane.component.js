(function () {
  'use strict';

  angular
    .module('calibrates')
    .directive('dossierPaneComponent', [dossierPaneComponent]);

  function dossierPaneComponent (){
    return {
      restrict: 'E',
      scope: {
        heroes: '=marvels',
        title: '=board',
        pref: '='
      },
      // template: '<li ng-repeat="x in heroes">{{ x.name }} </li>'
      templateUrl: function(jQuery, attrs){
        // return 'templates/tpl2.html';
        return (attrs.pref =='2') ? './app/calibrates/views/components/tpl2.html': './app/calibrates/views/components/tpl1.html';
      }
    }
  }

})();