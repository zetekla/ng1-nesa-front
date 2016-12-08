(function () {
  'use strict';

angular
  .module('calibrates')
  .component('uploaderComponent', {
    bindings:{
      vm: '='
    },
    templateUrl: './app/calibrates/components/uploader/uploader.tpl.html',
    controller: function (Upload) {
      // let uploader = this.uploader = new FileUploader({});
      let usePlaceHolder    = true,
        useRandomized     = true,
        $ctrl = this.vm;

      this.$onInit = function(){
        this.log = '';
        this.username = '';
      };

      this.update = function(files){
        this.upload(files);
      };

      this.upload = function(files){
        if(files && files.length) {
          Upload.base64DataUrl(files).then(function(urls){

            _.times(files.length, function(i){
              files[i].file = urls[i].split(',')[1];
              files[i].filename = files[i].name;
            });

            $ctrl.equipment.documents = files;
          });

          /*console.log('json Blob', Upload.jsonBlob(files));
          _.forEach(files, function(file){
            console.log('json Blob forEach', Upload.jsonBlob(file));
          });*/

          // console.log(files, 'username', this.username);
        }
      };
    },
    controllerAs: '$ctrl'
})

})();