//Attributes service used to communicate Attributes REST endpoints
(function () {
  'use strict';

  angular
    .module('calibrates')
    .factory('AttributesService', AttributesService);

  AttributesService.$inject = ['$resource'];

  function AttributesService($resource) {
    var Attribute = $resource('http://localhost:3000/equipments/files/:file_id', {
      file_id: '@file_id'
    }, {
      update: {
        method: 'PUT'
      }
    });

    angular.extend(Attribute.prototype, {
      createOrUpdate: function () {
        var attribute = this;
        return createOrUpdate(attribute);
      }
    });

    return Attribute;

    function createOrUpdate(attribute) {
      if (attribute.file_id) {
        return attribute.$update(onSuccess, onError);
      } else {
        return attribute.$save(onSuccess, onError);
      }

      // Handle successful response
      function onSuccess(attribute) {
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