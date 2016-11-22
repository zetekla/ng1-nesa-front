(function () {
  'use strict';

  // Dossiers controller
  angular
    .module('calibrates')
    .controller('DossiersController', DossiersController);

  DossiersController.$inject = ['$scope', '$state', '$window', 'dossierResolve'];

  function DossiersController ($scope, $state, $window, dossier) {
    var vm        = this;
    vm.equipment  = dossier; // dossier.$resolve(function(data){  }) ;
    vm.state      = $state.params;

    vm.error      = null;
    vm.form       = {};
    vm.remove     = remove;
    vm.save       = save;

    // Remove existing Dossier
    function remove() {
      if ($window.confirm('Are you sure you want to delete this Dossier?')) {
        var asset_id = vm.equipment.asset_id;
        vm.equipment.$remove({file_id: vm.equipment.ECMS_Dossiers[0].file_id}, function(){
          $state.go('equipments.view', {asset_id: asset_id});
        });
      }
    }

    // Save Dossier
    function save(isValid) {
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.form.dossiersForm');
        return false;
      }

      // Create a new article, or update the current instance
      vm.equipment.createOrUpdate()
        .then(successCallback)
        .catch(errorCallback);

      function successCallback(res) {
        $state.go('equipments.view', {asset_id: res.asset_id});
      }

      function errorCallback(res) {
        vm.error = res.data.message;
      }
    }


    /* HEROES LIST COMPONENT */
    $scope.board  = 'Heroes List';
    $scope.pref   = 1;
    $scope.kaban  = [
      {
        "name": "Ninja Turtle",
        "attribute": "agile tactic",
        "present": "chapter 44"
      },
      {
        "name": "Wolfverine",
        "attribute": "claws attack",
        "present": "chapter 5"
      },
      {
        "name": "Jean",
        "attribute": "psychiatrist",
        "present": "chapter 2"
      },
      {
        "name": "Rogue",
        "attribute": "physical swiftness",
        "present": "chapter 4"
      },
      {
        "name": "Scott",
        "attribute": "cyclop laser",
        "present": "chapter 2"
      },
      {
        "name": "Phoenix",
        "attribute": "fire element, fire ball",
        "present": "chapter 6"
      },
      {
        "name": "Psylocke",
        "attribute": "psychic",
        "present": "chapter 9"
      },
      {
        "name": "Magneto",
        "attribute": "magnetism, metal attraction",
        "present": "chapter 15"
      }
    ];

    vm.name         = 'Ellen_Page';
    vm.reverseName  = function(){
      vm.name = vm.name.split('').reverse().join('');
    };
  }
})();