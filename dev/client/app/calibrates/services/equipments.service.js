// import {equipmentURI} from '../../dev/client/app/config/default.js';
//Equipments service used to communicate Equipments REST endpoints
(function () {
  'use strict';
  angular
    .module('calibrates')
    .factory('EquipmentsService', EquipmentsService);

  EquipmentsService.$inject = ['$resource'];

  function EquipmentsService($resource) {
    let equipmentURI = 'http://localhost:3003/equipments/:asset_id';
    // let equipmentURI = 'http://esp21:3003/equipments/:asset_id';
    let Equipment = $resource(equipmentURI, {
      asset_id: '@asset_id'
    }, {
      update: {
        method: 'PUT'
      }
    }/*,{
      stripTrailingSlashes: false
    }*/);

    angular.extend(Equipment.prototype, {
      createOrUpdate: function () {
        let equipment = this;
        return createOrUpdate(equipment);
      }
    });

    return Equipment;

    function createOrUpdate(equipment) {
      if (equipment.asset_id) {

        if (_.has(equipment, 'documents'))
        if (equipment.documents) {
          let documents = _.pick(equipment, ['asset_id', 'documents', '$save']);
          documents.$save(onSuccess, onError);
        }

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
        let error = errorResponse.data;
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