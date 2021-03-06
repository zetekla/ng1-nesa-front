(function () {
  'use strict';

angular
  .module('calibrates')
  .component('equipmentsListComponent', {
    bindings: {
      equipments: '<',
      searchText: '<',
      remove:     '<'
    },
    template: `
      <div class="row">
        <table class="table table-bordered col-xs-12 table-middle">
          <thead>
          <tr class="bg-info">
            <th class="text-nowrap" rowspan="2">#</th>
            <th class="text-nowrap" rowspan="2">Asset Tag Number</th>
            <th class="text-nowrap" rowspan="2">Model Number</th>
            <th class="text-nowrap" rowspan="2">Location</th>
            <th class="text-nowrap" rowspan="2">Last Calibration Date</th>
            <th class="text-nowrap" rowspan="2">Next Calibration Date</th>
            <!--<th class="text-nowrap" colspan="4">File Info</th>-->
            <!--<th class="text-nowrap" rowspan="2">Equipment</th>-->
            <th class="text-nowrap" rowspan="2">Actions</th>
          </tr>
          <!-- <tr class="bg-info">
            <th class="text-nowrap">File</th>
            <th class="text-nowrap">CreatedAt</th>
            <th class="text-nowrap">UpdatedAt</th>
            <th class="text-nowrap">Dossier</th>
          </tr>-->
          </thead>
          <tbody ng-repeat="equipment in $ctrl.equipments | filter:$ctrl.searchText" ng-class-even="'stripedblue'" ng-class-odd="'stripedbeige'">
          <tr>
            <td scope="row" rowspan="{{equipment.ECMS_Dossiers.length}}">{{$index+1}}</td>
            <td rowspan="{{equipment.ECMS_Dossiers.length}}" data-ui-sref="calibration.view({ asset_id: equipment.asset_id })">
              <a href="//asset#{{ equipment.asset_id }}">{{equipment.asset_number}}</a>
            </td>
            <td rowspan="{{equipment.ECMS_Dossiers.length}}">{{equipment.model}}</td>
            <td rowspan="{{equipment.ECMS_Dossiers.length}}">{{equipment.ECMS_Location.desc}}</td>
            <td rowspan="{{equipment.ECMS_Dossiers.length}}">
              <button type="button" class="btn btn-info" ng-click="changeCalDate()">{{equipment.last_cal | date:'MM/dd/yyyy'}}</button>
            </td>
            <td rowspan="{{equipment.ECMS_Dossiers.length}}">{{equipment.next_cal | date:'MM/dd/yyyy'}}</td>
          <!-- <td data-ui-sref="calibration.dossierView({ file_id: equipment.ECMS_Dossiers[0].file_id })"><a href="//file#{{ equipment.ECMS_Dossiers[0].file_id }}">{{equipment.ECMS_Dossiers[0].filename}}</a></td>
            <td>{{equipment.ECMS_Dossiers[0].createdAt}}</td>
            <td>{{equipment.ECMS_Dossiers[0].updatedAt}}</td>
            <td>
              <button type="button" class="btn btn-danger btn-lg" ng-click="$ctrl.remove({ file_id: equipment.ECMS_Dossiers[0].file_id })"><i class="fa fa-remove"></i>&nbsp; file#{{ equipment.ECMS_Dossiers[0].file_id }}</button>
            </td>
            <td rowspan="{{equipment.ECMS_Dossiers.length}}">
              <button type="button" class="btn btn-danger btn-lg" ng-click="$ctrl.remove({ asset_id: equipment.asset_id })"><i class="fa fa-trash"></i>&nbsp; equipment</button>
            </td>
            -->
            <td rowspan="{{equipment.ECMS_Dossiers.length}}">
              <button type="button" class="btn btn-warning btn-lg" data-ui-sref="calibration.dossierCreate({ asset_id: equipment.asset_id })"><i class="fa fa-paperclip"></i>&nbsp; Record</button>
            </td>
          </tr>
          <!--<tr data-ng-repeat="document in equipment.ECMS_Dossiers | limitTo:20:1">
            <tr ng-show="displayFile" ng-init="displayFile=false">
            <td>File content <i>{{document.file | json}}</i></td>
            <td data-ui-sref="calibration.dossierView({ file_id: document.file_id })"><a href="//file#{{ document.file_id }}"><i>{{document.filename}}</i></a></td>
            <td data-ng-bind="document.createdAt"></td>
            <td data-ng-bind="document.updatedAt"></td>
            <td>
              <button type="button" class="btn btn-danger btn-lg" ng-click="$ctrl.remove({ file_id: document.file_id })"><i class="fa fa-remove"></i>&nbsp; file#{{ document.file_id }}</button>
            </td>
          </tr>-->
          </tbody>
        </table>
      </div>
    `
  })
})();