//Fichiers service used to communicate Fichiers REST endpoints
(function () {
  'use strict';

  angular
    .module('calibrates')
    .factory('FichiersService', FichiersService);

  FichiersService.$inject = ['$resource'];

  function FichiersService($resource) {
    var Fichier = $resource('http://localhost:3000/equipments/files/:file_id', {
      file_id: '@file_id'
    }, {
      update: {
        method: 'PUT'
      }
    });

    angular.extend(Fichier.prototype, {
      createOrUpdate: function () {
        var fichier = this;
        return createOrUpdate(fichier);
      }
    });

    return Fichier;

    function createOrUpdate(fichier) {
      if (fichier.file_id) {
        return fichier.$update(onSuccess, onError);
      } else {
        return fichier.$save(onSuccess, onError);
      }

      // Handle successful response
      function onSuccess(fichier) {
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