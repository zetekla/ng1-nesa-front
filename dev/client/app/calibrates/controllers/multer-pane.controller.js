(function () {
  'use strict';
  
  angular
    .module('calibrates')
    .controller('MulterPaneController', MulterPaneController);

  MulterPaneController.$inject = ['$scope'];

  function MulterPaneController($scope) {
    console.log('hello from multer-pane');
  }
})();