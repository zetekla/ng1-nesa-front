(function () {
  'use strict';

  angular
    .module('plunker')
    .service('UtilityService', UtilityService);

  UtilityService.$inject = [];

  function UtilityService(){
    this.greeting = function(){ return 'hi from utilityService'};

    this.buffer2base64String  = function (bufferArray){
      return btoa(String.fromCharCode(...new Uint8Array(bufferArray)));
    };

    this.decode2regularString = function (bufferArray) {
      return atob(this.buffer2base64String(bufferArray));
    };

    this.templateGenerator = function (dossier){
      dossier.src = dossier.filename.split('.').pop();
      let image_ext   = ['png', 'jpg', 'jpeg'];
      let pdf_ext     = ['pdf'];
      let word_ext    = ['doc', 'docx', 'odt'];
      let video_ext   = ['mov', 'wmv', 'dat', 'mp4', 'avi', 'flv'];

      switch (true){
        case _.includes(image_ext,dossier.src):
          dossier.src       = 'data:image/'+dossier.src+';base64,'+this.buffer2base64String(dossier.file.data);
          dossier.template  = `<img src="${dossier.src}" alt="${dossier.filename}">`;
          break;
        case _.includes(pdf_ext,dossier.src):
          dossier.src   = 'data:application/'+dossier.src+';base64,' + this.buffer2base64String(dossier.file.data);
          dossier.template  = ` 
                    <!--<embed ng-src="https://www.cca.edu/sites/default/files/pdf/08/word-to-pdf.pdf" style="width:200px;height:200px;"></embed>-->
                    <embed ng-src="${dossier.src}" style="width:100%;height:auto;"></embed>
                    <br>
                    <button ng-click="ctrl.download(dossier.src)" class="btn btn-primary"><i class="fa fa-print" aria-hidden="true"></i> Print</button>
                    <a download="${dossier.filename}" href="${dossier.src}" title="${dossier.filename}" /><i class="fa fa-save" aria-hidden="true"></i> Download</a>
                  `;
          break;
        case _.includes(word_ext,dossier.src):
          dossier.src       = 'data:application/msword;base64,' +this.buffer2base64String(dossier.file.data);
          dossier.template  = `
                    <embed ng-src="${dossier.src}" style="width:200px;height:200px;"></embed>
                    <br>
                    <br>
                    <object data="${dossier.src}" type="application/msword" style="width:200px;height:200px;"></object>
                    <br>
                    <button ng-click="ctrl.download(dossier.src)" class="btn btn-primary">download</button>
                  `;
          break;
        case _.includes(video_ext,dossier.src):
          dossier.src = '';
          dossier.template  = ``;
          break;
        default:
          dossier.src       = this.decode2regularString(dossier.file.data);
          dossier.template  = `<div id='display${dossier.file_id}'><u>File content</u>: <span class="text-success">${dossier.src}</span></div>`;
      }
    }


  }
}());