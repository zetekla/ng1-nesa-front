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
      .state('equipments.fichierView', {
        url: '/files/:file_id',
        templateUrl: './app/calibrates/views/view-fichier.html',
        controller: 'fichiersController',
        controllerAs: 'vm',
        resolve: {
          fichierResolve: getFichier
        },
        data:{
          pageTitle: 'Equipment {{ fichierResolve.file_id }}'
        }
      })
      .state('equipments.fichierCreate', {
        url: '/:asset_id/fichierCreate',
        templateUrl: './app/calibrates/views/form-fichiers.html',
        controller: 'fichiersController',
        controllerAs: 'vm',
        resolve: {
          equipmentResolve: getEquipment
        },
        data: {
          roles: ['user', 'admin'],
          pageTitle : 'Asset File Create'
        }
      })
      /*
        .state('equipments.assetFileView',{
          url:'/:asset_id/:file_id'

        .state('equipments.assetFileEdit', {
          url:'/:asset_id/:file_id/edit   => need file_id be sent as a param to update the correct set of files
          file_id ~~ id in attrs table.
          file_id is used to delete a right file in the database.

          It's a good practice to develop full CRUD operations and then strip away the unnecessary front-end functionality.
           and enhance back-end security, ACL,...
      */

    ;
  }

  getEquipment.$inject = ['$stateParams', 'EquipmentsService'];

  function getEquipment($stateParams, EquipmentsService) {
    console.log($stateParams);
    return EquipmentsService.get({
      asset_id: $stateParams.asset_id
    }).$promise;
  }

  newEquipment.$inject = ['EquipmentsService'];

  function newEquipment(EquipmentsService) {
    return new EquipmentsService();
  }

  /* Fichiers */
  getFichier.$inject = ['$stateParams', 'FichiersService'];

  function getFichier($stateParams, FichiersService) {
    console.log($stateParams);
    return FichiersService.get({
      file_id: $stateParams.file_id
    }).$promise;
  }

  newFichier.$inject = ['FichiersService'];

  function newFichier(FichiersService) {
    return new FichiersService();
  }
})();