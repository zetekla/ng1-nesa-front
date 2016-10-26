var app = angular.module('plunker');

app.service('RestfulService', RestfulServiceFn);

RestfulServiceFn.$inject = ['$http'];

function RestfulServiceFn($http){
  this.getEquipment = function (uri, onSuccess, onError) {
    $http.get(uri)
      .then(function(response){
        onSuccess(response);
      })
      .catch(function (err) {
         // console.dir(err);
        onError(err);
      })
  }
}