(function () {
    'use strict';

    angular.module('BlurAdmin.pages.avaliacao', [
        'BlurAdmin.pages.avaliacao.manter',
        'BlurAdmin.pages.avaliacao.abertas',
        'BlurAdmin.pages.avaliacao.criar'
    ])
            .config(routeConfig);

    /** @ngInject */
    function routeConfig($stateProvider) {
        $stateProvider
                .state('avaliacao', {
                    abstract: true,
                    template: '<div ui-view></div>',
                    url: '/avaliacao',
                    title: 'Avalia\u00e7\u00e3o',
                    sidebarMeta: {
                        icon: 'ion-android-home',
                        order: 0
                    },
                });
    }

})();
