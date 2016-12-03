(function () {
  'use strict';

  angular
    .module('calibrates')
    .directive('marvelsList', [marvelsList]);

  marvelsListController.$inject = ['$scope'];
  function marvelsListController($scope){
    let vm    = this;
    vm.title  = 'Marvel List'; // okay
    vm.pref   = 2;
    vm.marvels = [
      {
        "name": "Phoenix",
        "attribute": "fire element, fire ball",
        "present": "chapter 6"
      },
      {
        "name": "Psylocke",
        "attribute": "psychic",
        "present": "chapter 9"
      },
      {
        "name": "Magneto",
        "attribute": "magnetism, metal attraction",
        "present": "chapter 15"
      },
      {
        "name": "Wolfverine",
        "attribute": "claws attack",
        "present": "chapter 5"
      }
    ];
  }

  function marvelsList (){
    return {
      restrict: 'E',
      scope: {
        marvels: '=',
        title: '=title',
        pref: '=pref'
      },
      // template: '<li ng-repeat="x in marvels">{{ x.name }} </li>'
      templateUrl: function(jQuery, attrs){
        return './app/calibrates/views/components/marvels-list.tpl.html';
      }
      ,
      controller: marvelsListController,
      controllerAs: 'vm',
      bindToController: true,
      replace: true
    }
  }
})();