(function () {
    'use strict';

    angular.module('BlurAdmin.pages.gerenciamento', [
        'BlurAdmin.pages.gerenciamento.controller'
    ])
            .config(routeConfig);

    /** @ngInject */
    function routeConfig($stateProvider) {
        $stateProvider
                .state('gerenciamento', {
                    url: '/manter',
                    controller: 'gerenciamentoController as vm',
                    templateUrl: 'app/pages/gerenciamento/gerenciamento.html',
                    title: 'Gerenciamento',
                    sidebarMeta: {
                        icon: 'ion-android-home',
                        order: 0
                    },
                });
    }

})();
