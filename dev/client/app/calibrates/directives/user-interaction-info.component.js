(function () {
  'use strict';

  angular
    .module('calibrates')
    .directive('userInteractionInfoComponent', [userInteractionInfoComponent]);

  function userInteractionInfoComponent(){
    return {
      restrict: "EA",
      scope: false,
      template:`
        <div class="row">
          <small>
            <em class="text-muted">
              Posted on
              <span data-ng-bind="vm.equipment.createdAt | date:'mediumDate'"></span>
              by
              <span data-ng-if="vm.equipment.user"
                    data-ng-bind="vm.equipment.user.displayName"></span>
              <span data-ng-if="!vm.equipment.user">Deleted User</span>
            </em>
          </small>
          <p class="lead" data-ng-bind="vm.equipment.content"></p>
        </div>
      `
    }
  }
})();