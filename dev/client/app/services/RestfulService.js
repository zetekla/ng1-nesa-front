let app = angular.module('plunker');

app.service('RestfulService', RestfulServiceFn);
app.filter('range', range);

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

function range() {
  return function(input, total) {
    total = parseInt(total);
    for (let i=0; i<total; i++)
      input.push(i);
    return input;
  };
}