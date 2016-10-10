(function () {
  'use strict';

  angular.module('BlurAdmin.pages.avaliacao.grafico', [
      'BlurAdmin.pages.avaliacao.grafico.controller'
  ])
      .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider) {
     $stateProvider
        .state('avaliacao.grafico', {
          url: '/:idAvaliacao/resultado',
          controller:'graficoController as vm',
          templateUrl: 'app/pages/avaliacoes/graficos/grafico.html',
          title: 'Resultados'
        });
  }

})();
