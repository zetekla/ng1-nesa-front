(function () {
  'use strict';

angular
  .module('calibrates')
  .component('nameInputComponent', {
    template: `
      <div>
        <div>Your name is : {{$ctrl.name}}</div>
        Change your name : <input type='text' ng-model='$ctrl.name' />
        <h2 ng-click="$ctrl.reverseName()">Hey {{$ctrl.name}}, Click me to reverse your name</h2>
      </div>
    `,
    controller: function(){
      this.name         = 'Ellen_Page';

      this.reverseName  = function(){
        this.name = this.name.split('').reverse().join('');
      };
    }
  })
})();