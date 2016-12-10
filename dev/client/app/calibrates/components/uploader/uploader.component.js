(function () {
  'use strict';

angular
  .module('calibrates')
  .component('uploaderComponent', {
    bindings:{
      vm: '='
    },
    templateUrl: './app/calibrates/components/uploader/uploader.tpl.html',
    controller: function (Upload, customValue, version, UtilityService) {
      let $ctrl = this.vm;

      this.$onInit = function(){
        this.log = '';
        this.username = '';
      };

      this.update = function(files){
        this.upload(files);
      };

      this.upload = function(files){
        console.log(customValue, version, UtilityService.greeting());

        if(files && files.length) {
          Upload.base64DataUrl(files).then(function(urls){

            _.times(files.length, function(i){
              files[i].file = urls[i].split('base64,')[1];

              if(files[i].type.re('application/pdf'))
                files[i].src  = 'data:application/pdf;base64,' + files[i].file;

              files[i].filename = files[i].name;
              console.log(files[i]);
            });
            $ctrl.equipment.documents = files;
          });
        }
      };
    },
    controllerAs: '$ctrl'
})

})();