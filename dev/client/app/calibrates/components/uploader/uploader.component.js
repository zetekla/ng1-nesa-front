(function () {
  'use strict';

angular
  .module('calibrates')
  .component('uploaderComponent', {
    bindings:{
      vm: '='
    },
    templateUrl: './app/calibrates/components/uploader/uploader.tpl.html',
    controller: function () {
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
          $ctrl.equipment.documents = files;
          console.log(files, 'username', this.username, 'ctrl', $ctrl);
        }
      };
    },
    controllerAs: '$ctrl'
})

})();