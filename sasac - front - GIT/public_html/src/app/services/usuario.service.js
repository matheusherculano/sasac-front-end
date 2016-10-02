(function () {
    'use strict';

    angular.module('Services.usuario', [])
            .service('usuarioService', function ($http, api) {
                var $this = this;
        
                var usuario = {};

                $this.getAll = function () {
                    return $http.get(api.url + "/usuario");
                };
                
                $this.getById = function (idUsuario) {
                    return $http.get(api.url + "/usuario/"+idUsuario);
                };
                
                $this.getUsuario = function(){
                  return usuario;  
                };
                
                $this.setUsuario = function(user){
                  usuario = user;  
                };

            });


})();
