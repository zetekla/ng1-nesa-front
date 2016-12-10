(function () {
  'use strict';

angular
  .module('calibrates')
  .component('dossierUploaderComponent', {
    bindings: {
      upload: '<'
    },
    template: `
      <div class="row">
        <span>WORKED WITH MULTER @route /dossier_upload </span>
        <form id="frmDoc" name="frmDocument" ng-submit="$ctrl.upload()" class="form-horizontal form-bordered" enctype="multipart/form-data" >
          <fieldset>
            <div class="form-group">
              <label class="col-md-4 control-label" for="file">Document<span class="text-danger">*</span></label>
              <div class="col-md-4">
                <div class="input-group">
                  <input type="file" name="file" id='file' required="required" />
                </div>
              </div>
            </div>
          </fieldset>
          <div class="form-group form-actions">
            <div class="col-md-8 col-md-offset-4">
              <button type="submit" class="btn btn-sm btn-primary"><i class="fa fa-upload"></i> Submit</button>
            </div>
          </div>
        </form>
      </div>      
    `,
    controller: function ($http) {
      this.upload = function(){
        // console.log(angular.element(document.querySelector('#file')));
        let file = angular.element(document.querySelector('#file')).prop("files")[0];
        this.files = [file];
        $http({
          method: 'POST',
          url: 'http://esp21:3003/dossier_upload',
          headers: { 'Content-Type': undefined },
          transformRequest: function (data) {
            let formData = new FormData();
            formData.append('model', angular.toJson(data.model));
            formData.append('file', data.files[0]);
            return formData;
          },
          data: { model: { title: 'hello'}, files: this.files }

        }).success(function (res) {
          console.log(res)
        });
      };
    }
  })
})();