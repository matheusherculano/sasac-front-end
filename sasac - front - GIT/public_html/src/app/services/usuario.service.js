(function () {
    'use strict';

    angular.module('Services.usuario', [])
            .service('usuarioService', function ($http, api) {
                var $this = this;

                $this.getAll = function () {
                    return $http.get(api.url + "/usuario");
                };

            });


})();
