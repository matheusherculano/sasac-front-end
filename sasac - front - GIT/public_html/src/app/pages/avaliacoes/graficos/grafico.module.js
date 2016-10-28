(function () {
  'use strict';

  angular.module('BlurAdmin.pages.avaliacao.grafico', [
      'BlurAdmin.pages.avaliacao.grafico.controller'
  ])
      .config(routeConfig)
      .config(chartJsConfig);

  /** @ngInject */
  function routeConfig($stateProvider) {
     $stateProvider
        .state('avaliacao.grafico', {
          url: '/:idAvaliacao/resultado',
          controller:'graficoController as vm',
          templateUrl: 'app/pages/avaliacoes/graficos/grafico.html',
          title: 'Resultados'
        });
  };
  
  function chartJsConfig(ChartJsProvider, baConfigProvider) {
    var layoutColors = baConfigProvider.colors;
    // Configure all charts
    ChartJsProvider.setOptions({
      colours: [ layoutColors.primary, layoutColors.danger, layoutColors.warning, layoutColors.success, layoutColors.info, layoutColors.default, layoutColors.primaryDark, layoutColors.successDark, layoutColors.warningLight, layoutColors.successLight, layoutColors.primaryLight],
      responsive: true,
      scaleFontColor: layoutColors.defaultText,
      scaleLineColor: layoutColors.border,
      pointLabelFontColor: layoutColors.defaultText
    });
    // Configure all line charts
    ChartJsProvider.setOptions('Line', {
      datasetFill: false
    });
  }

})();
