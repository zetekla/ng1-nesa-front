(function () {
  'use strict';

  angular
    .module('calibrates')
    .directive('uploaderMockupComponent', [uploaderMockupComponent]);

  function uploaderMockupComponent(){
    return {
      restrict: "EA",
      scope: false,
      template: `
      <div class="row">
        <div class="row alert alert-warning">
          <p class="text-lg-center">FILE ADDING SECTION</p>
          <div class="col-sm-6">
            <label class="control-label" for="incrementer">Specify how many files:</label>
            <div class="controls input-group input-group-lg">
              <span class="input-group-addon">Number</span>
              <input id="incrementer" name="incrementer" type="number" ng-init="vm.incrementer=0" ng-model="vm.incrementer" class="form-control" min="0" max="99" ng-pattern="/^\d+$/">
              <!--<span class="error-text" ng-show="vm.form.equipmentForm.incrementer.$dirty && vm.form.equipmentForm.incrementer.$invalid">Must Enter a Number (ex: 2) </span>-->
            </div>
          </div>
        </div>
        <!--<div ng-hide="!vm.incrementer">-->
        <!--<span ng-init="vm.equipment.documents = []"></span>-->
        <div ng-repeat="document in vm.equipment.documents">
          <div class = "row" id="documentID">
            <div class="col-sm-6">
              <div class="form-group">
                <label class="control-label" for="documentFile">Uploader Pane #{{ $index+1 }}</label>
                <div class="controls input-group input-group-lg">
                  <input id="documentFile" name="file" type="text" ng-model="document.file" class="form-control" placeholder="Browse..">{{ document.file }}
                </div>
              </div>
            </div>
          </div>
        </div>
        <!--</div>-->
      </div>
      `
    }
  }
})();