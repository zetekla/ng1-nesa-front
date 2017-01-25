(function () {
  'use strict';

  angular
    .module('calibrates')
    .controller('MulterPaneController', MulterPaneController);

  MulterPaneController.$inject = ['$scope', '$http'];

  function MulterPaneController($scope, $http) {
    let vm    = this, URI = 'http://localhost:3003/multer_upload'; // URI = 'http://esp21:3003/multer_upload';
    vm.title  = 'filename_placeholder';
    vm.formData = {};
    vm.submit = function () {
      console.log('file attrs', vm.formData.file[0]);
      let config = {
        params: { file: vm.formData.file[0]},
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      };
      console.log('File Attrs', config);
      $http
        // .get('http://esp21:3003/dossier_upload')
        .post(URI, vm.formData)
        .then(res=>console.log(res.data))
        .catch(err=>console.error(err));
    };
  }
})();