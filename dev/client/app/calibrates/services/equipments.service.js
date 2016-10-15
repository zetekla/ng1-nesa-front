//Equipments service used to communicate Equipments REST endpoints
(function () {
  'use strict';

  angular
    .module('calibrates')
    .factory('EquipmentsService', EquipmentsService);

  EquipmentsService.$inject = ['$resource'];

  function EquipmentsService($resource) {
    var Equipment = $resource('http://localhost:3000/equipments/:asset_number', {
      asset_number: '@asset_number'
    }, {
      update: {
        method: 'PUT'
      }
    }/*,{
      stripTrailingSlashes: false
    }*/);

    angular.extend(Equipment.prototype, {
      createOrUpdate: function () {
        var equipment = this;
        return createOrUpdate(equipment);
      }
    });

    return Equipment;

    function createOrUpdate(equipment) {
      if (equipment.asset_number) {
        return equipment.$update(onSuccess, onError);
      } else {
        return equipment.$save(onSuccess, onError);
      }

      // Handle successful response
      function onSuccess(equipment) {
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