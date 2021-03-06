(function () {
  'use strict';

  angular
    .module('calibrates')
    .directive('templateFormComponent', [templateFormComponent]);

  function templateFormComponent(){
    return {
      restrict: "EA",
      scope: false,
      template: `
        <div class="form-group" show-errors>
          <div ng-if="vm.state.file_id" class = "row">
            <div class="row">
              <div class="col-sm-4 form-group">
                <label class="control-label" for="assetNumber">label1</label>
                <div class="controls input-group">
                  <span class="input-group-addon">Asset Number</span>
                  <input id="assetNumber" ng-readonly="vm.equipment.asset_id" name="assetNumber" type="text" ng-model="vm.equipment.asset_number" class="form-control" placeholder="assetNumber" required>
                </div>
              </div>
              <div class="col-sm-4 form-group">
                <label class="control-label" for="model">label2</label>
                <div class="controls input-group">
                  <span class="input-group-addon">Model</span>
                  <input id="model" ng-readonly="vm.equipment.asset_id" name="model" type="text" ng-model="vm.equipment.model" class="form-control" placeholder="model">
                </div>
              </div>
              <div class="col-sm-4 form-group">
                <label class="control-label" for="location">label3</label>
                <div class="controls input-group">
                  <span class="input-group-addon">Location</span>
                  <input id="location" name="location" type="text" ng-model="vm.equipment.ECMS_Location.desc" class="form-control" placeholder="location">
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-sm-4 form-group">
                <div class="controls input-group">
                  <span class="input-group-addon">Last Cal</span>
                  <input id="last_cal" name="last_cal" type="text" ng-model="vm.equipment.last_cal" class="form-control" placeholder="last_cal">
                </div>
              </div>
              <div class="col-sm-4 form-group">
                <div class="controls input-group">
                  <span class="input-group-addon">Schedule</span>
                  <input id="schedule" name="schedule" type="text" ng-model="vm.equipment.schedule" class="form-control" placeholder="schedule">
                </div>
              </div>
              <div class="col-sm-4 form-group">
                <div class="controls input-group">
                  <span class="input-group-addon">Next Cal</span>
                  <input id="next_cal" name="next_cal" type="text" ng-model="vm.equipment.next_cal" class="form-control" placeholder="next_cal">
                </div>
              </div>
            </div>
          </div>
          <div ng-if="!vm.state.file_id" class = "row">
            <div class="row">
              <div class="col-sm-6">
                <div class="controls input-group">
                  <span class="input-group-addon">Model</span>
                  <input id="model2" ng-readonly="vm.equipment.asset_id" name="model" type="text" ng-model="vm.equipment.model" uib-typeahead="model for model in vm.hints.model | filter:$viewValue | limitTo:8" typeahead-on-select="vm.onSelectModel($item, $model, $label)" class="form-control form-control-lg" placeholder="model" autocomplete="off">
                </div>
                <div class="controls input-group">
                  <span class="input-group-addon">Asset Number {{ vm.asset_status }}</span>
                  <input id="assetNumber2" ng-readonly="vm.equipment.asset_id" name="assetNumber" type="text" ng-model="vm.equipment.asset_number" ng-change="vm.onChangeAsset_Number(vm.equipment.asset_number)" uib-typeahead="asset_number for asset_number in vm.hints.asset_number | filter:$viewValue | limitTo:8" typeahead-on-select="vm.onSelectAsset_Number($item, $model, $label)" class="form-control form-control-lg" placeholder="asset number" autocomplete="off" required>
                </div>
                <div class="controls input-group">
                  <span class="input-group-addon">Location</span>
                  <input id="location2" name="location" type="text" ng-readonly="vm.locationDisabled" ng-model="vm.equipment.ECMS_Location.desc" uib-typeahead="location for location in vm.hints.location | filter:$viewValue | limitTo:8" class="form-control form-control-lg" autocomplete="off" placeholder="location">
                </div>
              </div>
              <div class="col-sm-6">
                <div class="controls input-group">
                  <span class="input-group-addon" ng-class="vm.statusAlert">Last Cal</span>
                  <input id="last_cal" name="last_cal" type="text" ng-model="vm.equipment.last_cal" class="form-control form-control-lg" placeholder="last_cal">
                </div>
                <div class="controls input-group">
                  <span class="input-group-addon">Schedule</span>
                  <input id="schedule" name="schedule" type="text" ng-model="vm.equipment.schedule" class="form-control form-control-lg" placeholder="schedule">
                </div>
                <div class="controls input-group">
                  <span class="input-group-addon">Next Cal</span>
                  <input id="next_cal" name="next_cal" type="text" ng-model="vm.equipment.next_cal" class="form-control form-control-lg" placeholder="next_cal">
                </div>
              </div>
            </div>
            <br> 
            
          </div>
        </div>
      `
    }
  }
})();