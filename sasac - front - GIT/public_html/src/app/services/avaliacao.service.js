(function () {
    'use strict';

    angular.module('Services.avaliacao', [])
            .service('avaliacaoService', function ($http, api) {
                var $this = this;

                $this.save = function (obj) {
                    return $http.post(api.url + "/avaliacao", obj);
                };
                
                $this.setPublicacao = function (idAvaliacao) {
                    return $http.post(api.url + "/avaliacao/"+idAvaliacao+"/publicacao");
                };
                
                $this.getAll = function () {
                    return $http.get(api.url + "/avaliacao");
                };
                
                $this.getById = function (idAvaliacao) {
                    return $http.get(api.url + "/avaliacao/"+idAvaliacao);
                };
            });


})();
