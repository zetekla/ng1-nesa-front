(function () {
  'use strict';

angular
  .module('calibrates')
  .component('userInteractionInfoComponent',  
  {
    bindings: {
      equipment: '<'
    },
    template:`
      <div class="row">
        <small>
          <em class="text-muted">
            Posted on
            <span data-ng-bind="$ctrl.equipment.createdAt | date:'mediumDate'"></span>
            by
            <span data-ng-if="$ctrl.equipment.user"
                  data-ng-bind="$ctrl.equipment.user.displayName"></span>
            <span data-ng-if="!$ctrl.equipment.user">Deleted User</span>
          </em>
        </small>
        <p class="lead" data-ng-bind="$ctrl.equipment.content"></p>
      </div>
    `
  })
})();