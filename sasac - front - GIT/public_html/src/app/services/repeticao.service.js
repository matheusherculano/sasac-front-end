(function () {
    'use strict';

    angular.module('Services.repeticao', [])
            .service('repeticaoService', function ($http, api) {
                var $this = this;

                $this.getRepeticao = function () {
                    return $http.get(api.url + "/repeticao");
                };
            });


})();
