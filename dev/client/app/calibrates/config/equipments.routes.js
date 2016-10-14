(function () {
  'use strict';

  angular
    .module('calibrates', ['ngResource'])
    .config(routeConfig)
    .factory('CalibratesService', CalibratesService);

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
        templateUrl: 'views/form-equipment.html',
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
        url: '/:equipmentId/edit',
        templateUrl: 'views/form-equipment.html',
        controller: 'EquipmentsController',
        controllerAs: 'vm',
        resolve: {
          equipmentResolve: getEquipment
        },
        data: {
          roles: ['user', 'admin'],
          pageTitle: 'Edit Equipment {{ equipmentResolve.name }}'
        }
      })
      .state('equipments.view', {
        url: '/:equipmentId',
        templateUrl: 'views/view-equipment.html',
        controller: 'EquipmentsController',
        controllerAs: 'vm',
        resolve: {
          equipmentResolve: getEquipment
        },
        data:{
          pageTitle: 'Equipment {{ equipmentResolve.name }}'
        }
      });
  }

  getEquipment.$inject = ['$stateParams', 'EquipmentsService'];

  function getEquipment($stateParams, EquipmentsService) {
    return EquipmentsService.get({
      equipmentId: $stateParams.equipmentId
    }).$promise;
  }

  newEquipment.$inject = ['EquipmentsService'];

  function newEquipment(EquipmentsService) {
    return new EquipmentsService();
  }

  function CalibratesService(){
    return 'Tested with CalibratesService';
  }
})();