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
      let usePlaceHolder    = true,
        useRandomized     = true,
        $ctrl = this.vm;

      this.$onInit = function(){
        // this.incrementer = 3;
      };

      this.uploaderGenerator = function(newVal){
        /*let element = angular.element( document.querySelector( '#documentID' ) );
        element.remove();*/

        if (newVal){
          $ctrl.equipment.documents = [];
          _.times(newVal, function(){
            let int = (useRandomized) ? (_.random(1,100)): ($ctrl.equipment.documents.length+1),
              file  = (usePlaceHolder)? 'placeholder'+ int : null;
            return $ctrl.equipment.documents.push({file: file, filename: file});
          });
        }
      };
    },
    controllerAs: '$ctrl'
})

})();