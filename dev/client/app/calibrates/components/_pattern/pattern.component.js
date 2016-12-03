(function () {
  'use strict';

  angular
    .module('calibrates')
    .component('componentPattern',
    {
      bindings: {
        message: '<'
      },
      // template: '<li ng-repeat="x in heroes">{{ x.name }} </li>',
      template:'<div>Provide {{$ctrl.message}}</div>',

      // The controller that handles our component logic
      controller: function () {
        // this.message = "the component !! feature"
      }
    })
})();