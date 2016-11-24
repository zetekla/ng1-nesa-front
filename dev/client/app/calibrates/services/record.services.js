(function () {
  'use strict';

  angular
    .module('calibrates')
    .factory('RecordService', RecordService);

  RecordService.$inject = ['$state', '$window', 'EquipmentsService', 'DossiersService'];

  function RecordService($state, $window, EquipmentsService, DossiersService){
    return {
      remove: function(record){
        if(record){
          if(_.has(record, 'asset_id'))
            if ($window.confirm('Are you sure you want to delete this Equipment?'))
              EquipmentsService.remove(record).$promise.then(function () {
                $state.reload();
              });

          if(_.has(record, 'file_id'))
            if ($window.confirm('Are you sure you want to delete this Dossier?'))
              DossiersService.remove(record).$promise.then(function(){
                $state.reload();
              });
        }
      }
    }
  }
}());