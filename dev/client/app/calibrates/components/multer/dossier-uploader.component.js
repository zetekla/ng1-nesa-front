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
        var file = angular.element(document.querySelector('#file')).prop("files")[0];
        this.files = [file];
        $http({
          method: 'POST',
          url: 'http://esp21:3003/dossier_upload',
          headers: { 'Content-Type': undefined },
          transformRequest: function (data) {
            var formData = new FormData();
            formData.append('model', angular.toJson(data.model));
            formData.append('file', data.files[0]);
            return formData;
          },
          data: { model: { title: 'hello'}, files: this.files }

        }).success(function (res) {
          console.log(res)
        });
      };

      /*   vm.uploader = $scope.uploader = new FileUploader({
       url: '/upload.php',
       alias: 'file'
       });

       // FILTERS

       vm.uploader.filters.push({
       name: 'customFilter' ,
       fn: function (item /!*{File|FileLikeObject}*!/ , options) {
       return this.queue.length < 10;
       }
       });

       // CALLBACKS

       vm.uploader.onWhenAddingFileFailed = function (item /!*{File|FileLikeObject}*!/ , filter , options) {
       console.info('onWhenAddingFileFailed' , item , filter , options);
       };
       vm.uploader.onAfterAddingFile = function (fileItem) {
       console.info('onAfterAddingFile' , fileItem);
       };
       vm.uploader.onAfterAddingAll = function (addedFileItems) {
       console.info('onAfterAddingAll' , addedFileItems);
       };
       vm.uploader.onBeforeUploadItem = function (item) {
       console.info('onBeforeUploadItem' , item);
       };
       vm.uploader.onProgressItem = function (fileItem , progress) {
       console.info('onProgressItem' , fileItem , progress);
       };
       vm.uploader.onProgressAll = function (progress) {
       console.info('onProgressAll' , progress);
       };
       vm.uploader.onSuccessItem = function (fileItem , response , status , headers) {
       console.info('onSuccessItem' , fileItem , response , status , headers);
       };
       vm.uploader.onErrorItem = function (fileItem , response , status , headers) {
       console.info('onErrorItem' , fileItem , response , status , headers);
       };
       vm.uploader.onCancelItem = function (fileItem , response , status , headers) {
       console.info('onCancelItem' , fileItem , response , status , headers);
       };
       vm.uploader.onCompleteItem = function (fileItem , response , status , headers) {
       console.info('onCompleteItem' , fileItem , response , status , headers);
       };
       vm.uploader.onCompleteAll = function () {
       console.info('onCompleteAll');
       };

       console.info('vm.uploader' , vm.uploader);*/
    }
  })
})();