      (function () {
        'use strict';

      angular
        .module('calibrates')
        .component('dossiersListViewComponent',
        {
          bindings: {
            state: '<',
            equipment: '<'
          },
          template:`
            <div class="row">
              <div class="col-sm-12" data-ng-repeat="dossier in $ctrl.equipment.ECMS_Dossiers" ng-class-even="'stripedblue'"
                   ng-class-odd="'stripedbeige'">
                <div class="row pull-left">
                  <span class="text-sm-left" ng-if="$ctrl.state.asset_id" data-ui-sref="calibration.dossierView({ file_id: dossier.file_id })"><a href="//file#{{ dossier.file_id }}">{{$index+1}}. Dossier #{{ dossier.file_id }}</a></span>
                  <span class="text-sm-left" ng-if="$ctrl.state.file_id" data-ui-sref="calibration.dossierEdit({ file_id: dossier.file_id })"><a href="//file#{{ dossier.file_id }}">{{$index+1}}. Dossier #{{ dossier.file_id }}</a></span>
                  <div class="row col-sm-10 offset-sm-5">
                    <file-display dossier="dossier">
                    </file-display>
                    <div class="">File name: <i>{{dossier.filename}}</i></div>
                    <div class="" data-ng-bind="dossier.createdAt"></div>
                    <div class="" data-ng-bind="dossier.updatedAt"></div>
                  </div>
                </div>
                <!--<div ng-if="$ctrl.state.asset_id" class="row pull-right">
                  <button type="button" class="btn btn-primary btn-lg" data-ui-sref="calibration.dossierEdit({ file_id: dossier.file_id })"><i class="fa fa-edit"></i></button>
                  &nbsp;
                  <button type="button" class="btn btn-danger btn-lg" ng-click="$ctrl.dossierRemove({ file_id: dossier.file_id })"><i class="fa fa-remove"></i></button>
                </div>-->
              </div>
            </div>
          `,
          controller: function(RecordService){
            let ctrl = this;

            this.$onInit = function(){
              this.dossierRemove      = record => RecordService.remove(record);
            };
          }
        })
      })();