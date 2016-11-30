(function () {
  'use strict';

  angular
    .module('calibrates')
    .component('equipmentDetailsComponent', {
      bindings: {
        equipment: '='
      },
      template: `
        <div class="row">
          <h2>{{$ctrl.equipment.equipmentInfo}} {{$ctrl.equipment.ECMS_Location.getLocation}}</h2>
          <h5 class="row offset-sm-5" data-ng-bind="$ctrl.equipment.last_cal | date:'MM/dd/yyyy'"></h5>
          <h5 class="row offset-sm-5" data-ng-bind="$ctrl.equipment.schedule"></h5>
          <h5 class="row offset-sm-5" data-ng-bind="$ctrl.equipment.next_cal | date:'MM/dd/yyyy'"></h5>
        </div>
      `,
      controller: function () {
      }
    })
})();