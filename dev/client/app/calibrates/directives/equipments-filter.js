(function () {
  'use strict';

  angular
    .module('calibrates')
    .directive('equipmentsFilter', [equipmentsFilter]);

  function equipmentsFilter(){
    return {
      restrict: "EA",
      scope: false,
      template: `
        <div class="row">
          <div class="col-lg-5">
            <div class="input-group input-group-lg">
              <input type="text" class="form-control" ng-model="vm.searchText" placeholder="Search...">
            </div>
          </div>
          <div class="col-lg-2">
            <span ng-hide="!vm.searchText"> Search for "{{vm.searchText}}" </span>
          </div>
          <div class="col-lg-5 text-center">
            <button class="btn btn-lg btn-primary" type="button" data-ui-sref="calibration.create">
              <i class="fa fa-plus"></i>
              Add equipment
            </button>
            &nbsp;
            <!--<button class="btn btn-lg btn-primary" type="button">
              <i class="fa fa-paperclip"></i>
              Add record
            </button>-->
          </div>
        </div> 
      `
    }
  }
})();