(function () {
  'use strict';

angular
  .module('calibrates')
  .component('dossiersList1Component', {
    bindings: {
      equipment: '<'
    },
    template:`
      <div class = "row">
        <div class="col-sm-12" ng-repeat="document in $ctrl.equipment.ECMS_Dossiers">
          <div class="row">
            <div class="alert alert-info text-xs-left">
              <span class="text-sm-left" data-ui-sref="calibration.dossierView({ file_id: document.file_id })"><a href="//file#{{ document.file_id }}">{{$index+1}}. Dossier #{{ document.file_id }}</a></span>
            </div>
            <!--<button ng-click="$ctrl.dossierToggle(document.hide)">(+|-)</button>-->
            <!--<div class="pull-right">
              <button type="button" class="btn btn-danger btn-sm" ng-click="$ctrl.dossierRemove({ file_id: document.file_id })"><i class="fa fa-remove"></i></button>
            </div>-->
          </div>
          <div class="col-sm-6">
            <div class="form-group">
              <label class="control-label" for="file">File</label>
              <div class="controls">
                <input id="file" name="file" type="text" ng-model="document.file" ng-readonly="$ctrl.equipment.asset_id" class="form-control" placeholder="file">
              </div>
            </div>
            <div class="form-group">
              <label class="control-label" for="filename">filename</label>
              <div class="controls">
                <input id="filename" name="filename" type="text" ng-readonly="true" ng-model="document.filename" class="form-control" placeholder="filename">
              </div>
            </div>
          </div>
      
          <div class="col-sm-6">
            <div class="form-group">
              <label class="control-label" for="createdAt">Uploaded Date</label>
              <div class="controls">
                <input id="createdAt" name="createdAt" type="text" ng-model="document.createdAt" ng-readonly="$ctrl.equipment.asset_id" class="form-control" placeholder="createdAt">
              </div>
            </div>
            <!--<div class="form-group">
              <label class="control-label" for="updatedAt">updatedAt</label>
              <div class="controls">
                <input id="updatedAt" name="updatedAt" type="text" ng-model="document.updatedAt" ng-readonly="$ctrl.equipment.asset_id" class="form-control" placeholder="updatedAt">
              </div>
            </div>-->
          </div>
        </div>
      </div>
    `
  })
})();