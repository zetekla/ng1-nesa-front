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
      /* templateUrl: function(jQuery, attrs){
        return './app/calibrates/views/directives/marvels-list.tpl.html';
      }*/
      template:`
        <div> 
          <div ng-if="vm.pref===2">
            <h2>{{vm.title}}</h2>
            <span>Pref: DISPLAY #{{vm.pref}}</span>
            <span ng-hide="true" id="prefID">{{vm.pref}}</span>
            <ul ng-repeat="marvel in vm.marvels">
              <li>{{marvel.name}} {{marvel.present}}</li>
            </ul>
          </div>
          <div ng-if="vm.pref===1">
            <div>
              <h2>{{vm.title}}</h2>
              <span>Pref: DISPLAY #{{vm.pref}}</span>
              <span ng-hide="true" id="prefID">{{vm.pref}}</span>
              <table border="1" style="color:#166CD7">
                <thead>
                <tr>
                  <th>Name</th>
                  <th>Skill</th>
                  <th>Appear</th>
                </tr>
                </thead>
                <tbody>
                <tr ng-repeat="marvel in vm.marvels">
                  <td>{{marvel.name}}</td>
                  <td>{{marvel.attribute}}</td>
                  <td>{{marvel.present}}</td>
                </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      `
      ,
      controller: marvelsListController,
      controllerAs: 'vm',
      bindToController: true,
      replace: true
    }
  }
})();