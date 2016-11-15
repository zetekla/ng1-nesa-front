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
        /*var data = _.pick(dossier.ECMS_Attributes[0], ['file', 'asset_number', 'filename']);
        console.log('update data ', data);*/
        return dossier.$update(dossier.ECMS_Attributes[0], onSuccess, onError);
      } else {
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
}());