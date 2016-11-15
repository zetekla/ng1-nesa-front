//Dossiers service used to communicate Dossiers REST endpoints
(function () {
  'use strict';

  angular
    .module('calibrates')
    .factory('DossierService', DossierService);

  DossierService.$inject = ['$resource', 'EquipmentsService'];
  // DossiersService.$inject = ['$resource'];

  function DossierService($resource, EquipmentsService) {
    var Dossier = $resource('http://localhost:3000/equipments/files/:file_id', {
      file_id: '@file_id'
    }, {
      update: {
        method: 'PUT'
      }
    });

    angular.extend(Dossier.prototype, {
      createOrUpdate: function () {
        var dossier = this;
        return createOrUpdate(dossier);
      }
    });

    return Dossier;

    function createOrUpdate(dossier) {
      if (dossier.ECMS_Attributes[0].file_id) {
        console.log('update dossier ', dossier);
        /*var data = _.pick(dossier.ECMS_Attributes[0], ['file', 'asset_number', 'filename']);
        console.log('update data ', data);*/
        return dossier.$update(onSuccess, onError);
      } else {
        console.log('save dossier ');
        return EquipmentsService.$save(dossier, onSuccess, onError);
      }

      // Handle successful response
      function onSuccess(dossier) {
        // Any required internal processing from inside the service, goes here.
      }

      // Handle error response
      function onError(errorResponse) {
        var error = errorResponse.data;
        // Handle error internally
        handleError(error);
      }
    }

    function handleError(error) {
      // Log error
      console.log(error);
    }
  }

  /*function DossiersService($resource) {
    var Dossier = $resource('http://localhost:3000/equipments/:asset_id', {
      asset_id: '@asset_id'
    }, {
      update: {
        method: 'PUT'
      }
    });

    return Dossier;
  }*/
}());