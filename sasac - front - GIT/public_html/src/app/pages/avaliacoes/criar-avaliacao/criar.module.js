(function () {
  'use strict';

  angular.module('BlurAdmin.pages.avaliacao.criar', [
      'BlurAdmin.pages.avaliacao.criar.controller'
  ])
      .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider) {
     $stateProvider
        .state('avaliacao.criar', {
          url: '/criar',
          controller:'criarController as vm',
          templateUrl: 'app/pages/avaliacoes/criar-avaliacao/criar.html',
          title: 'Criar Avalia\u00e7\u00f5es',
          sidebarMeta: {
            icon: 'ion-android-home',
            order: 0,
          },
        });
  }

})();
