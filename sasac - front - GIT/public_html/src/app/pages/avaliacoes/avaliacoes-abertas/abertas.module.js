(function () {
  'use strict';

  angular.module('BlurAdmin.pages.avaliacao.abertas', [
      'BlurAdmin.pages.avaliacao.abertas.controller'
  ])
      .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider) {
     $stateProvider
        .state('avaliacao.abertas', {
          url: '/avaliacoes-abertas',
          controller:'abertasController as vm',
          templateUrl: 'app/pages/avaliacoes/avaliacoes-abertas/abertas.html',
          title: 'Avalia\u00e7\u00f5es Abertas',
          sidebarMeta: {
            icon: 'ion-android-home',
            order: 0,
          },
        });
  }

})();
