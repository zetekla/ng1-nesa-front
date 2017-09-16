(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var _default2 = require('../../config/default.js');

var _default3 = _interopRequireDefault(_default2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

console.log('show default!', _default3.default);

//Equipments service used to communicate Equipments REST endpoints
(function () {
  'use strict';

  angular.module('calibrates').factory('EquipmentsService', EquipmentsService);

  EquipmentsService.$inject = ['$resource'];

  function EquipmentsService($resource) {
    var equipmentURI = 'http://localhost:3003/equipments/:asset_id';
    // let equipmentURI = 'http://esp21:3003/equipments/:asset_id';
    var Equipment = $resource(equipmentURI, {
      asset_id: '@asset_id'
    }, {
      update: {
        method: 'PUT'
      } /*,{
         stripTrailingSlashes: false
        }*/ });

    angular.extend(Equipment.prototype, {
      createOrUpdate: function createOrUpdate() {
        var equipment = this;
        return _createOrUpdate(equipment);
      }
    });

    return Equipment;

    function _createOrUpdate(equipment) {
      if (equipment.asset_id) {

        if (_.has(equipment, 'documents')) if (equipment.documents) {
          var documents = _.pick(equipment, ['asset_id', 'documents', '$save']);
          documents.$save(onSuccess, onError);
        }

        return equipment.$update(onSuccess, onError);
      } else {
        return equipment.$save(onSuccess, onError);
      }

      // Handle successful response
      function onSuccess(equipment) {}
      // Any required internal processing from inside the service, goes here.


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
})();

},{"../../config/default.js":2}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = {
  equipmentURI: 'http://localhost:3000/equipments/:asset_id',
  dossierURI: 'http://localhost:3000/equipments/files/:file_id'
};

},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJkZXYvY2xpZW50L2FwcC9jYWxpYnJhdGVzL3NlcnZpY2VzL2VxdWlwbWVudHMuc2VydmljZS5lczYuanMiLCJkZXYvY2xpZW50L2FwcC9jb25maWcvZGVmYXVsdC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7O0FDQUE7Ozs7OztBQUNBLFFBQVEsR0FBUixDQUFZLGVBQVo7O0FBRUE7QUFDQyxhQUFZO0FBQ1g7O0FBQ0EsVUFDRyxNQURILENBQ1UsWUFEVixFQUVHLE9BRkgsQ0FFVyxtQkFGWCxFQUVnQyxpQkFGaEM7O0FBSUEsb0JBQWtCLE9BQWxCLEdBQTRCLENBQUMsV0FBRCxDQUE1Qjs7QUFFQSxXQUFTLGlCQUFULENBQTJCLFNBQTNCLEVBQXNDO0FBQ3BDLFFBQUksZUFBZSw0Q0FBbkI7QUFDQTtBQUNBLFFBQUksWUFBWSxVQUFVLFlBQVYsRUFBd0I7QUFDdEMsZ0JBQVU7QUFENEIsS0FBeEIsRUFFYjtBQUNELGNBQVE7QUFDTixnQkFBUTtBQURGLE9BRFAsQ0FJRjs7V0FKRSxFQUZhLENBQWhCOztBQVVBLFlBQVEsTUFBUixDQUFlLFVBQVUsU0FBekIsRUFBb0M7QUFDbEMsc0JBQWdCLDBCQUFZO0FBQzFCLFlBQUksWUFBWSxJQUFoQjtBQUNBLGVBQU8sZ0JBQWUsU0FBZixDQUFQO0FBQ0Q7QUFKaUMsS0FBcEM7O0FBT0EsV0FBTyxTQUFQOztBQUVBLGFBQVMsZUFBVCxDQUF3QixTQUF4QixFQUFtQztBQUNqQyxVQUFJLFVBQVUsUUFBZCxFQUF3Qjs7QUFFdEIsWUFBSSxFQUFFLEdBQUYsQ0FBTSxTQUFOLEVBQWlCLFdBQWpCLENBQUosRUFDQSxJQUFJLFVBQVUsU0FBZCxFQUF5QjtBQUN2QixjQUFJLFlBQVksRUFBRSxJQUFGLENBQU8sU0FBUCxFQUFrQixDQUFDLFVBQUQsRUFBYSxXQUFiLEVBQTBCLE9BQTFCLENBQWxCLENBQWhCO0FBQ0Esb0JBQVUsS0FBVixDQUFnQixTQUFoQixFQUEyQixPQUEzQjtBQUNEOztBQUVELGVBQU8sVUFBVSxPQUFWLENBQWtCLFNBQWxCLEVBQTZCLE9BQTdCLENBQVA7QUFDRCxPQVRELE1BU087QUFDTCxlQUFPLFVBQVUsS0FBVixDQUFnQixTQUFoQixFQUEyQixPQUEzQixDQUFQO0FBQ0Q7O0FBRUQ7QUFDQSxlQUFTLFNBQVQsQ0FBbUIsU0FBbkIsRUFBOEIsQ0FFN0I7QUFEQzs7O0FBR0Y7QUFDQSxlQUFTLE9BQVQsQ0FBaUIsYUFBakIsRUFBZ0M7QUFDOUIsWUFBSSxRQUFRLGNBQWMsSUFBMUI7QUFDQTtBQUNBLG9CQUFZLEtBQVo7QUFDRDtBQUNGOztBQUVELGFBQVMsV0FBVCxDQUFxQixLQUFyQixFQUE0QjtBQUMxQjtBQUNBLGNBQVEsR0FBUixDQUFZLEtBQVo7QUFDRDtBQUNGO0FBQ0YsQ0E5REEsR0FBRDs7Ozs7Ozs7a0JDSmU7QUFDYixnQkFBYyw0Q0FERDtBQUViLGNBQVk7QUFGQyxDIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsImltcG9ydCBfZGVmYXVsdCBmcm9tICcuLi8uLi9jb25maWcvZGVmYXVsdC5qcyc7XG5jb25zb2xlLmxvZygnc2hvdyBkZWZhdWx0IScsX2RlZmF1bHQpO1xuXG4vL0VxdWlwbWVudHMgc2VydmljZSB1c2VkIHRvIGNvbW11bmljYXRlIEVxdWlwbWVudHMgUkVTVCBlbmRwb2ludHNcbihmdW5jdGlvbiAoKSB7XG4gICd1c2Ugc3RyaWN0JztcbiAgYW5ndWxhclxuICAgIC5tb2R1bGUoJ2NhbGlicmF0ZXMnKVxuICAgIC5mYWN0b3J5KCdFcXVpcG1lbnRzU2VydmljZScsIEVxdWlwbWVudHNTZXJ2aWNlKTtcblxuICBFcXVpcG1lbnRzU2VydmljZS4kaW5qZWN0ID0gWyckcmVzb3VyY2UnXTtcblxuICBmdW5jdGlvbiBFcXVpcG1lbnRzU2VydmljZSgkcmVzb3VyY2UpIHtcbiAgICBsZXQgZXF1aXBtZW50VVJJID0gJ2h0dHA6Ly9sb2NhbGhvc3Q6MzAwMy9lcXVpcG1lbnRzLzphc3NldF9pZCc7XG4gICAgLy8gbGV0IGVxdWlwbWVudFVSSSA9ICdodHRwOi8vZXNwMjE6MzAwMy9lcXVpcG1lbnRzLzphc3NldF9pZCc7XG4gICAgbGV0IEVxdWlwbWVudCA9ICRyZXNvdXJjZShlcXVpcG1lbnRVUkksIHtcbiAgICAgIGFzc2V0X2lkOiAnQGFzc2V0X2lkJ1xuICAgIH0sIHtcbiAgICAgIHVwZGF0ZToge1xuICAgICAgICBtZXRob2Q6ICdQVVQnXG4gICAgICB9XG4gICAgfS8qLHtcbiAgICAgIHN0cmlwVHJhaWxpbmdTbGFzaGVzOiBmYWxzZVxuICAgIH0qLyk7XG5cbiAgICBhbmd1bGFyLmV4dGVuZChFcXVpcG1lbnQucHJvdG90eXBlLCB7XG4gICAgICBjcmVhdGVPclVwZGF0ZTogZnVuY3Rpb24gKCkge1xuICAgICAgICBsZXQgZXF1aXBtZW50ID0gdGhpcztcbiAgICAgICAgcmV0dXJuIGNyZWF0ZU9yVXBkYXRlKGVxdWlwbWVudCk7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICByZXR1cm4gRXF1aXBtZW50O1xuXG4gICAgZnVuY3Rpb24gY3JlYXRlT3JVcGRhdGUoZXF1aXBtZW50KSB7XG4gICAgICBpZiAoZXF1aXBtZW50LmFzc2V0X2lkKSB7XG5cbiAgICAgICAgaWYgKF8uaGFzKGVxdWlwbWVudCwgJ2RvY3VtZW50cycpKVxuICAgICAgICBpZiAoZXF1aXBtZW50LmRvY3VtZW50cykge1xuICAgICAgICAgIGxldCBkb2N1bWVudHMgPSBfLnBpY2soZXF1aXBtZW50LCBbJ2Fzc2V0X2lkJywgJ2RvY3VtZW50cycsICckc2F2ZSddKTtcbiAgICAgICAgICBkb2N1bWVudHMuJHNhdmUob25TdWNjZXNzLCBvbkVycm9yKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBlcXVpcG1lbnQuJHVwZGF0ZShvblN1Y2Nlc3MsIG9uRXJyb3IpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIGVxdWlwbWVudC4kc2F2ZShvblN1Y2Nlc3MsIG9uRXJyb3IpO1xuICAgICAgfVxuXG4gICAgICAvLyBIYW5kbGUgc3VjY2Vzc2Z1bCByZXNwb25zZVxuICAgICAgZnVuY3Rpb24gb25TdWNjZXNzKGVxdWlwbWVudCkge1xuICAgICAgICAvLyBBbnkgcmVxdWlyZWQgaW50ZXJuYWwgcHJvY2Vzc2luZyBmcm9tIGluc2lkZSB0aGUgc2VydmljZSwgZ29lcyBoZXJlLlxuICAgICAgfVxuXG4gICAgICAvLyBIYW5kbGUgZXJyb3IgcmVzcG9uc2VcbiAgICAgIGZ1bmN0aW9uIG9uRXJyb3IoZXJyb3JSZXNwb25zZSkge1xuICAgICAgICBsZXQgZXJyb3IgPSBlcnJvclJlc3BvbnNlLmRhdGE7XG4gICAgICAgIC8vIEhhbmRsZSBlcnJvciBpbnRlcm5hbGx5XG4gICAgICAgIGhhbmRsZUVycm9yKGVycm9yKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBoYW5kbGVFcnJvcihlcnJvcikge1xuICAgICAgLy8gTG9nIGVycm9yXG4gICAgICBjb25zb2xlLmxvZyhlcnJvcik7XG4gICAgfVxuICB9XG59KCkpOyIsImV4cG9ydCBkZWZhdWx0IHtcbiAgZXF1aXBtZW50VVJJOiAnaHR0cDovL2xvY2FsaG9zdDozMDAwL2VxdWlwbWVudHMvOmFzc2V0X2lkJyxcbiAgZG9zc2llclVSSTogJ2h0dHA6Ly9sb2NhbGhvc3Q6MzAwMC9lcXVpcG1lbnRzL2ZpbGVzLzpmaWxlX2lkJ1xufTsiXX0=
