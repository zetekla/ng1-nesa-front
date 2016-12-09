(function () {
  'use strict';

  angular
    .module('calibrates')
    .directive('fileDisplay', ['$compile',
      function ($compile) {
        return {
          scope:{
            dossier: '<'
          },
          restrict: 'EA',
          link: function (scope, element, attrs) {
            templateGenerator(scope.dossier);

            element.html(scope.dossier.template, scope.dossier.file_id);
            $compile(element.contents())(scope);
            console.log(scope,element, attrs);

            function templateGenerator(dossier){
              dossier.src = dossier.filename.split('.').pop();
              let image_ext   = ['png', 'jpg', 'jpeg'];
              let pdf_ext     = ['pdf'];
              let word_ext    = ['doc', 'docx', 'odt'];
              let video_ext   = ['mov', 'wmv', 'dat', 'mp4', 'avi', 'flv'];

              switch (true){
                case _.includes(image_ext,dossier.src):
                  dossier.src       = 'data:image/'+dossier.src+';base64,'+decode2base64String(dossier.file.data);
                  dossier.template  = `<img src="${dossier.src}" alt="${dossier.filename}">`;
                  break;
                case _.includes(pdf_ext,dossier.src):
                  dossier.src       = 'data:application/'+dossier.src+';base64,'+decode2base64String(dossier.file.data);
                  dossier.template  = `
                    
                    <embed ng-src="${dossier.src}" style="width:200px;height:200px;"></embed>
                    <br>
                    <button ng-click="ctrl.downloadPDF(dossier.src)" class="btn btn-primary">download</button>
                    <a download="${dossier.filename}" href="${dossier.src}" title="${dossier.filename}" />Download using anchor tag</a>
                  `;
                  // http://stackoverflow.com/questions/25781927/how-to-read-pdf-stream-in-angularjs
                  // download : http://jsfiddle.net/filixix/0816jdfq/
                  // http://stackoverflow.com/questions/31299799/how-to-open-base64-encoded-pdf-in-javascript
                  // http://stackoverflow.com/questions/21628378/angularjs-display-blob-pdf-in-an-angular-app   <object ng-show="dossier.src" data="${dossier.src}" type="application/pdf" style="width: 100%; height: 400px;"></object>
                  // https://github.com/sayanee/angularjs-pdf
                  // http://www.angularjs4u.com/modules/5-angularjs-microsoft-word-excel-integrations/
                  // https://www.npmjs.com/package/angular-save-html-to-pdf
                  break;
                case _.includes(word_ext,dossier.src):
                  dossier.src       = 'data:application/msword;base64,' +decode2base64String(dossier.file.data);
                  dossier.template  = `
                    <embed ng-src="${dossier.src}" style="width:200px;height:200px;"></embed>
                  `;
                  break;
                case _.includes(video_ext,dossier.src):
                  dossier.src = '';
                  dossier.template  = ``;
                  break;
                default:
                  dossier.src       = decode2regularString(dossier.file.data);
                  dossier.template  = `<div id='display${dossier.file_id}'><u>File content</u>: <span class="text-success">${dossier.src}</span></div>`;
              }
            }

            function decode2base64String(bufferArray){
              return btoa(String.fromCharCode(...new Uint8Array(bufferArray)));
            }

            function decode2regularString(bufferArray) {
              return atob(decode2base64String(bufferArray));
            }
          },
          controllerAs: 'ctrl',
          controller: function () {
            this.$onInit = function() {
              this.downloadPDF = function (file) {
                window.open("data:application/pdf;base64," + btoa(file));
              };
            };
            // console.log(this);
          }
        };
      }
    ]);
})();