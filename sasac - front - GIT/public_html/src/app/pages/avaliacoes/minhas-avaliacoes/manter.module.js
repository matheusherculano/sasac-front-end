(function () {
  'use strict';

  angular.module('BlurAdmin.pages.avaliacao.manter', [
      'BlurAdmin.pages.avaliacao.manter.controller'
  ])
      .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider) {
     $stateProvider
        .state('avaliacao.manter', {
          url: '/manter',
          controller:'manterController as vm',
          templateUrl: 'app/pages/avaliacoes/minhas-avaliacoes/manter.html',
          title: 'Minhas Avalia\u00e7\u00f5es',
          sidebarMeta: {
            icon: 'ion-android-home',
            order: 0,
          },
        });
  }

})();
