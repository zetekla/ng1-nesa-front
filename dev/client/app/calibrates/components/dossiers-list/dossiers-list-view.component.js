(function () {
  'use strict';

angular
  .module('calibrates')
  .component('dossiersListViewComponent',
  {
    bindings: {
      state: '<',
      equipment: '<',
      dossierRemove: '<'
    },
    template:`
      <div class="row">
        <div class="col-sm-12" data-ng-repeat="document in $ctrl.equipment.ECMS_Dossiers" ng-class-even="'stripedblue'"
             ng-class-odd="'stripedbeige'">
          <!--<div ng-if="$ctrl.state.file_id">SHOW!</div>-->
          <div class="row pull-left">
            <span class="text-sm-left" ng-if="$ctrl.state.asset_id" data-ui-sref="calibration.dossierView({ file_id: document.file_id })"><a href="//file#{{ document.file_id }}">{{$index+1}}. Dossier #{{ document.file_id }}</a></span>
            <span class="text-sm-left" ng-if="$ctrl.state.file_id" data-ui-sref="calibration.dossierEdit({ file_id: document.file_id })"><a href="//file#{{ document.file_id }}">{{$index+1}}. Dossier #{{ document.file_id }}</a></span>
            <div class="row col-sm-10 offset-sm-5">
              <div class="">File name: <i>{{document.filename}}</i></div>
              <div class="" data-ng-bind="document.createdAt"></div>
              <div class="" data-ng-bind="document.updatedAt"></div>
            </div>
          </div>
          <!--<div ng-if="$ctrl.state.asset_id" class="row pull-right">
            <button type="button" class="btn btn-primary btn-lg" data-ui-sref="calibration.dossierEdit({ file_id: document.file_id })"><i class="fa fa-edit"></i></button>
            &nbsp;
            <button type="button" class="btn btn-danger btn-lg" ng-click="$ctrl.dossierRemove({ file_id: document.file_id })"><i class="fa fa-remove"></i></button>
          </div>-->
        </div>
      </div>
    `
  })
})();