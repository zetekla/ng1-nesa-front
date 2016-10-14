//Equipments service used to communicate Equipments REST endpoints
(function () {
  'use strict';

  angular
    .module('calibrates')
    .factory('EquipmentsService', EquipmentsService);

  EquipmentsService.$inject = ['$resource'];

  function EquipmentsService($resource) {
    return $resource('http://localhost:3000/equipment/:equipmentId', {
      equipmentId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });
  }
})();