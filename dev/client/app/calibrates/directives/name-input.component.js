(function () {
  'use strict';

  angular
    .module('calibrates')
    .directive('nameInputComponent', [nameInputComponent]);

  function nameInputComponent(){
    return {
      restrict: "EA",
      scope: false,
      template: "<div>Your name is : {{vm.name}}</div>"+
      "Change your name : <input type='text' ng-model='vm.name' />"
    }
  }
})();