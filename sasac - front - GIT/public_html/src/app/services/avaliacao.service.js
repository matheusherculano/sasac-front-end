(function () {
    'use strict';

    angular.module('Services.avaliacao', [])
            .service('avaliacaoService', function ($http, api) {
                var $this = this;

                $this.save = function (obj) {
                    return $http.post(api.url + "/avaliacao", obj);
                };

                $this.update = function (obj) {
                    return $http.put(api.url + "/avaliacao/", obj);
                };

                $this.setPublicacao = function (idAvaliacao) {
                    return $http.post(api.url + "/avaliacao/" + idAvaliacao + "/publicacao");
                };

                $this.getAll = function () {
                    return $http.get(api.url + "/avaliacao");
                };

                $this.getPublic = function (boo) {
                    return $http.get(api.url + "/avaliacao/publicado?publicado=" + boo);
                };

                $this.getById = function (idAvaliacao) {
                    return $http.get(api.url + "/avaliacao/" + idAvaliacao);
                };

                $this.getByUser = function (idUsuario) {
                    return $http.get(api.url + "/avaliacao/usuario/" + idUsuario);
                };
                
                $this.getDadosGrafico = function (idAvalicao) {
                    return $http.get(api.url + "/periodo/"+idAvalicao+"/grafico/");
                };

                $this.responder = function (resposta) {
                    return $http.post(api.url + "/periodo/resposta/", resposta);
                };
            });


})();
