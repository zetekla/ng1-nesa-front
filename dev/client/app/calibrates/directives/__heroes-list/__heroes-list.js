(function () {
  'use strict';

  angular
    .module('calibrates')
    .directive('heroesList', [heroesList]);

  function heroesList (){
    return {
      restrict: 'E',
      scope: {
        heroes: '=capcom',
        title: '=board',
        pref: '='
      },
      // template: '<li ng-repeat="x in heroes">{{ x.name }} </li>'
      templateUrl: function(jQuery, attrs){
        // return 'templates/tpl2.html';
        return (attrs.pref =='2') ? './app/calibrates/directives/__heroes-list/heroes-list-tpl2.html': './app/calibrates/directives/__heroes-list/heroes-list-tpl1.html';
      }
    }
  }
})();