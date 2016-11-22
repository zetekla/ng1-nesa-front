(function () {
  'use strict';

  angular
    .module('calibrates')
    .directive('marvelsListComponent', [marvelsListComponent]);

  marvelsListComponentController.$inject = ['$scope'];
  function marvelsListComponentController($scope){
    var vm    = this;
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

  function marvelsListComponent (){
    return {
      restrict: 'E',
      scope: {
        marvels: '=',
        title: '=title',
        pref: '=pref'
      },
      // template: '<li ng-repeat="x in marvels">{{ x.name }} </li>'
      templateUrl: function(jQuery, attrs){
        console.log(attrs);
        return './app/calibrates/views/components/marvels-list-tpl.html';
      }
      ,
      controller: marvelsListComponentController,
      controllerAs: 'vm',
      bindToController: true,
      replace: true
    }
  }
})();