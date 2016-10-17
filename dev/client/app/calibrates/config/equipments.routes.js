(function () {
  'use strict';

  angular
    .module('calibrates', ['ngResource'])
    .config(routeConfig)
    /*.run(function($state) {
      $state.go('equipments'); //make a transition to equipments state when app starts
    })*/;

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('equipments', {
        abstract: true,
        url: '/equipments',
        template: '<ui-view/>'
      })
      .state('equipments.list', {
        url: '',
        templateUrl: 'calibrates/views/list-equipments.html',
        controller: 'EquipmentsListController',
        controllerAs: 'vm',
        data: {
          pageTitle: 'Equipments List'
        }
      })
      .state('equipments.create', {
        url: '/create',
        templateUrl: 'calibrates/views/form-equipment.html',
        controller: 'EquipmentsController',
        controllerAs: 'vm',
        resolve: {
          equipmentResolve: newEquipment
        },
        data: {
          roles: ['user', 'admin'],
          pageTitle : 'Equipments Create'
        }
      })
      .state('equipments.edit', {
        url: '/:location_id/edit',
        templateUrl: 'calibrates/views/form-equipment.html',
        controller: 'EquipmentsController',
        controllerAs: 'vm',
        resolve: {
          equipmentResolve: getEquipment
        },
        data: {
          roles: ['user', 'admin'],
          pageTitle: 'Edit Equipment {{ equipmentResolve.location_id }}'
        }
      })
      .state('equipments.view', {
        url: '/:location_id',
        templateUrl: 'calibrates/views/view-equipment.html',
        controller: 'EquipmentsController',
        controllerAs: 'vm',
        resolve: {
          equipmentResolve: getEquipment
        },
        data:{
          pageTitle: 'Equipment {{ equipmentResolve.location_id }}'
        }
      });
  }

  getEquipment.$inject = ['$stateParams', 'EquipmentsService'];

  function getEquipment($stateParams, EquipmentsService) {
    console.log($stateParams);
    return EquipmentsService.get({
      location_id: $stateParams.location_id
    }).$promise;
  }

  newEquipment.$inject = ['EquipmentsService'];

  function newEquipment(EquipmentsService) {
    return new EquipmentsService();
  }
})();