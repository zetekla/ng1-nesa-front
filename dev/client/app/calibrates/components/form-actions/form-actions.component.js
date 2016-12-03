(function () {
  'use strict';

  angular
    .module('calibrates')
    .component('formActionsComponent', {
      bindings: {
        state: '<',
        equipment: '<'
      },
      template: `
        <div class="row">
          <div class="col-sm-2">
            <div class="form-group">
              <button type="submit" class="btn btn-lg btn-success"><i class="fa fa-pencil-square-o" aria-hidden="true"></i> {{($ctrl.state.file_id || $ctrl.equipment.asset_id) ? 'Update' : 'Create'}}</button>
            </div>
          </div>
          <div class="col-sm-2" ng-hide="!($ctrl.state.file_id || $ctrl.state.asset_id)" ng-if="!$ctrl.state.asset_id">
            <div class="form-group">
              <button ng-if="$ctrl.state.file_id" type="button" class="btn btn-warning btn-lg" data-ui-sref="calibration.dossierCreate({ asset_id: $ctrl.equipment.asset_id })"><i class="fa fa-paperclip"></i>&nbsp; Record</button>
            </div>
          </div>
          <div class="pull-right" ng-hide="!($ctrl.state.file_id || $ctrl.state.asset_id)">
            <div class="form-group">
              <button type="button" class="btn btn-danger btn-lg" data-ng-click="$ctrl.remove()">
                <i ng-if="$ctrl.state.file_id" class="fa fa-remove"></i>
                <i ng-if="$ctrl.state.asset_id" class="fa fa-trash"></i>&nbsp; Remove
              </button>
            </div>
          </div>
        </div> 
      `
    })
})();