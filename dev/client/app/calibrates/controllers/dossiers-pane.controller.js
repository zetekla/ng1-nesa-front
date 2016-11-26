(function () {
  'use strict';

  // DossiersPane controller
  angular
    .module('calibrates')
    .controller('DossiersPaneController', DossiersPaneController);

  DossiersPaneController.$inject = ['$scope', '$http', 'FileUploader'];

  function DossiersPaneController($scope, $http, FileUploader) {
    let vm = this;

    vm.upload = function(){
      var file = angular.element(document.querySelector('#file')).prop("files")[0];
      $scope.files = [];
      $scope.files.push(file);
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
        data: { model: { title: 'hello'}, files: $scope.files }

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
})();