(function () {
  'use strict';

  let app = angular.module('calibrates', ['ngResource']);
    app.config(routeConfig);
    /*app.run(function($state) {
      $state.go('equipments'); //make a transition to equipments state when app starts
    })*/
  
  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('calibration', {
        abstract: true,
        url: '/calibration',
        template: '<ui-view/>'
      })
      .state('calibration.list', {
        url: '',
        templateUrl: './app/calibrates/views/list-equipments.html',
        controller: 'EquipmentsListController',
        controllerAs: 'vm',
        data: {
          pageTitle: 'Equipments List'
        }
      })
      .state('calibration.create', {
        url: '/equipments/create',
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
      .state('calibration.edit', {
        url: '/equipments/:asset_id/edit',
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
      .state('calibration.view', {
        url: '/equipments/:asset_id',
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
      .state('calibration.dossierCreate', {
        url: '/equipments/:asset_id/dossierCreate',
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
      .state('calibration.dossierEdit', {
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
      .state('calibration.dossierView', {
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
      .state('calibration.dossierPane', {
        url: '/dossierPane',
        templateUrl: './app/calibrates/views/dossier-pane.html'
      })
      .state('calibration.multerPane', {
        url: '/multerPane' ,
        templateUrl: './app/calibrates/views/multer-pane.html' ,
        controller: 'MulterPaneController' ,
        controllerAs: 'vm'
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
  getDossier.$inject = ['$stateParams', 'DossiersService'];

  function getDossier($stateParams, DossiersService) {
    return DossiersService.get({
      file_id: $stateParams.file_id
    }).$promise;
  }

  newDossier.$inject = ['DossiersService'];

  function newDossier(DossiersService) {
    return new DossiersService();
  }
})();