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
        templateUrl: './app/calibrates/views/list-equipments.html',
        controller: 'EquipmentsListController',
        controllerAs: 'vm',
        data: {
          pageTitle: 'Equipments List'
        }
      })
      .state('equipments.create', {
        url: '/create',
        templateUrl: './app/calibrates/views/form-equipment.html',
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
        url: '/:asset_id/edit',
        templateUrl: './app/calibrates/views/form-equipment.html',
        controller: 'EquipmentsController',
        controllerAs: 'vm',
        resolve: {
          equipmentResolve: getEquipment
        },
        data: {
          roles: ['user', 'admin'],
          pageTitle: 'Edit Equipment {{ equipmentResolve.asset_id }}'
        }
      })
      .state('equipments.view', {
        url: '/:asset_id',
        templateUrl: './app/calibrates/views/view-equipment.html',
        controller: 'EquipmentsController',
        controllerAs: 'vm',
        resolve: {
          equipmentResolve: getEquipment
        },
        data:{
          pageTitle: 'Equipment {{ equipmentResolve.asset_id }}'
        }
      })
      .state('equipments.dossierCreate', {
        url: '/:asset_id/dossierCreate',
        templateUrl: './app/calibrates/views/form-dossier.html',
        controller: 'EquipmentsController',
        controllerAs: 'vm',
        resolve: {
          equipmentResolve: getEquipment
        },
        data: {
          roles: ['user', 'admin'],
          pageTitle : 'Dossier Create'
        }
      })
      .state('equipments.dossierEdit', {
        url: '/files/:file_id/edit',
        templateUrl: './app/calibrates/views/form-dossier.html',
        controller: 'DossiersController',
        controllerAs: 'vm',
        resolve: {
          dossierResolve: getDossier
        },
        data:{
          pageTitle: 'Dossier {{ dossierResolve.file_id }}'
        }
      })
      .state('equipments.dossierView', {
        url: '/files/:file_id',
        templateUrl: './app/calibrates/views/view-dossier.html',
        controller: 'DossiersController',
        controllerAs: 'vm',
        resolve: {
          dossierResolve: getDossier
        },
        data:{
          pageTitle: 'Dossier {{ dossierResolve.file_id }}'
        }
      })
    ;
  }

  getEquipment.$inject = ['$stateParams', 'EquipmentsService'];

  function getEquipment($stateParams, EquipmentsService) {
    return EquipmentsService.get({
      asset_id: $stateParams.asset_id
    }).$promise;
  }

  newEquipment.$inject = ['EquipmentsService'];

  function newEquipment(EquipmentsService) {
    return new EquipmentsService();
  }

  /* Dossier */
  getDossier.$inject = ['$stateParams', 'DossierService'];

  function getDossier($stateParams, DossierService) {
    return DossierService.get({
      file_id: $stateParams.file_id
    }).$promise;
  }

  newDossier.$inject = ['DossierService'];

  function newDossier(DossierService) {
    return new DossierService();
  }
})();