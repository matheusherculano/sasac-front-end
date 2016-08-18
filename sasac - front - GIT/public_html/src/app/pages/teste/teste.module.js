(function () {
  'use strict';

  angular.module('BlurAdmin.pages.teste', [
      'BlurAdmin.pages.teste.controller'
  ])
      .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider) {
     $stateProvider
        .state('teste', {
          url: '/teste',
          controller:'testeController as vm',
          templateUrl: 'app/pages/teste/teste.html',
          title: 'teste',
          sidebarMeta: {
            icon: 'ion-android-home',
            order: 0,
          },
        });
  }

})();
