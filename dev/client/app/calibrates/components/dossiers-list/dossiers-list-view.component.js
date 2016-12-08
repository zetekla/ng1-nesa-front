(function () {
  'use strict';

angular
  .module('calibrates')
  .component('dossiersListViewComponent',
  {
    bindings: {
      state: '<',
      equipment: '<'
    },
    template:`
      <div class="row">
        <div class="col-sm-12" data-ng-repeat="document in $ctrl.equipment.ECMS_Dossiers" ng-class-even="'stripedblue'"
             ng-class-odd="'stripedbeige'">
          <!--<div ng-if="$ctrl.state.file_id">SHOW!</div>-->
          <div class="row pull-left">
            <span class="text-sm-left" ng-if="$ctrl.state.asset_id" data-ui-sref="calibration.dossierView({ file_id: document.file_id })"><a href="//file#{{ document.file_id }}">{{$index+1}}. Dossier #{{ document.file_id }}</a></span>
            <span class="text-sm-left" ng-if="$ctrl.state.file_id" data-ui-sref="calibration.dossierEdit({ file_id: document.file_id })"><a href="//file#{{ document.file_id }}">{{$index+1}}. Dossier #{{ document.file_id }}</a></span>
            <div class="row col-sm-10 offset-sm-5">
              <!--<div><img ngf-thumbnail="document.file.data || '/thumb.jpg'"</div>-->
              <div ng-class="'display'+document.file_id">
              
              </div>
              <!--<div ng-if="document.filetype==='text' && document.src"><u>File content</u>: {{ document.src }}</div>-->
              <div class="">File name: <i>{{document.filename}}</i></div>
              <div class="" data-ng-bind="document.createdAt"></div>
              <div class="" data-ng-bind="document.updatedAt"></div>
            </div>
          </div>
          <!--<div ng-if="$ctrl.state.asset_id" class="row pull-right">
            <button type="button" class="btn btn-primary btn-lg" data-ui-sref="calibration.dossierEdit({ file_id: document.file_id })"><i class="fa fa-edit"></i></button>
            &nbsp;
            <button type="button" class="btn btn-danger btn-lg" ng-click="$ctrl.dossierRemove({ file_id: document.file_id })"><i class="fa fa-remove"></i></button>
          </div>-->
        </div>
      </div>
    `,
    controller: function(RecordService){
      this.$onInit = function(){
        this.dossierRemove      = record => RecordService.remove(record);
      };

      _(this.equipment.ECMS_Dossiers).forEach(function(dossier){
        dossier.src = dossier.filename.split('.').pop();
        let image_ext   = ['png', 'jpg', 'jpeg'];
        let pdf_ext     = ['pdf'];
        let video_ext   = ['mov', 'wmv', 'dat', 'mp4', 'avi', 'flv'];

        switch (true){
          case _.includes(image_ext,dossier.src):
            dossier.src = 'data:image/'+dossier.src+';base64,'+decode2base64String(dossier.file.data);
            angular.element(document.querySelector('.display'+dossier.file_id))
              .append('<img src="dossier.src" alt="dossier.filename">');
            dossier.filetype = 'image';
            break;
          case _.includes(pdf_ext,dossier.src):
            dossier.src = '';
            dossier.filetype = 'pdf';
            break;
          case _.includes(video_ext,dossier.src):
            dossier.src = '';
            dossier.filetype = 'video';
            break;
          default:
            dossier.src = decode2regularString(dossier.file.data);
            // document.querySelector('.display'+dossier.file_id).style.backgroundColor ='olive';
            angular.element(document.querySelector('.display'+dossier.file_id))
              .append('<span><u>File content</u>: {{ dossier.src }}</span>');
            dossier.filetype = 'text';
        }
      });

      console.log(this.equipment.ECMS_Dossiers, this);


      function decode2base64String(bufferArray){
        return btoa(String.fromCharCode(...new Uint8Array(bufferArray)));
      }

      function decode2regularString(bufferArray) {
        return atob(decode2base64String(bufferArray));
      }
    }
  })
})();