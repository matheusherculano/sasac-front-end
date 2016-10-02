/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.inicio', [
      'BlurAdmin.pages.inicio.controller'
  ])
      .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider) {
    $stateProvider
        .state('inicio', {
          url: '/inicio',
          templateUrl: 'app/pages/inicio/inicio.html',
          controller:'inicioController as vm',
          title: 'Inicio',
          sidebarMeta: {
            icon: 'ion-android-home',
            order: 0,
          },
        });
  }

})();
