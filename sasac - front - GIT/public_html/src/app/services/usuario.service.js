(function () {
    'use strict';

    angular.module('Services.usuario', [])
            .service('usuarioService', function ($http, api) {
                var $this = this;

                var usuario = {};
                var keyUsuario;

                $this.getAll = function () {
                    return $http.get(api.url + "/usuario");
                };

                $this.getById = function (idUsuario) {
                    return $http.get(api.url + "/usuario/" + idUsuario);
                };

                $this.getPeriodosRespondidos = function (idUsuario) {
                    return $http.get(api.url + "/usuario/" + idUsuario + "/periodo");
                };

                $this.getUsuario = function () {
                    var $this = this;
                    $this.getPeriodosRespondidos(keyUsuario).then(function sucesso(response) {
                        usuario = response.data;

                        console.log("usuario", usuario);
                    }, function falha() {
                        console.log("Ocorreu uma falha ao recuperar o usuário");
                    });
                    
                    return usuario;
                };

                //setar o usuario dentro da service
                $this.setUsuarioInterno = function (user) {
                    usuario = user;
                };

                $this.setUsuario = function (idUsuario) {
                    var $this = this;
                    keyUsuario = idUsuario;
                };
                
                $this.getIdUsuario = function () {
                    return keyUsuario;
                };

            });


})();
