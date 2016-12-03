(function () {
  'use strict';

  angular
    .module('calibrates')
    .component('filePaneComponent', {
      bindings: {
        equipment: '='
      },
      template: `
        <div class="row">
          <div class="row alert alert-warning">Upload calibration.equipment.asset file using the inputs below</div>
          <div class = "row">
            <div class="col-sm-6">
              <div class="form-group">
                <label class="control-label" for="fileUploader">Uploader Pane</label>
                <div class="controls input-group input-group-lg">
                  <input id="fileUploader" name="file" type="text" ng-model="$ctrl.equipment.file" class="form-control" placeholder="Browse..">
                </div>
              </div>
            </div>
          </div>
        </div>
      `
    })
})();