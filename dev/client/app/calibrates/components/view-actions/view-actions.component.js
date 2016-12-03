(function () {
  'use strict';

angular
  .module('calibrates')
  .component('viewActionsComponent', {
    bindings: {
      state: '<',
      equipment: '<',
      remove: '<'
    },
    template: `
      <div class="row">
        <a ng-if="$ctrl.state.asset_id" class="btn btn-lg btn-primary"
           data-ui-sref="calibration.edit({ asset_id: $ctrl.equipment.asset_id })">
          <i class="fa fa-pencil-square-o" aria-hidden="true"></i>&nbsp; Edit
        </a>
        <a ng-if="$ctrl.state.file_id" class="btn btn-lg btn-primary"
           data-ui-sref="calibration.dossierEdit({ file_id: $ctrl.equipment.ECMS_Dossiers[0].file_id })">
          <i class="fa fa-pencil-square-o" aria-hidden="true"></i>&nbsp; Edit
        </a>
        <a class="btn btn-warning btn-lg" data-ui-sref="calibration.dossierCreate({ asset_id: $ctrl.equipment.asset_id })">
          <i class="fa fa-paperclip"></i>&nbsp; Record
        </a>
        <a  class="btn btn-lg btn-danger pull-right"
           data-ng-click="$ctrl.remove()">
          <i ng-if="$ctrl.state.file_id" class="fa fa-remove"></i>
          <i ng-if="$ctrl.state.asset_id" class="fa fa-trash"></i> &nbsp; Remove
        </a>
      </div> 
    `
  })
})();