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
                
                $this.getPeriodosRespondidos = function (idUsuario) {
                    return $http.get(api.url + "/usuario/"+idUsuario+"/periodo");
                };
                
                $this.getUsuario = function(){
                  return usuario;  
                };
                
                //setar o usuario dentro da service
                $this.setUsuarioInterno = function (user){
                    usuario = user; 
                };
                
                $this.setUsuario = function(user){
                    var $this = this;
                    
                    $this.getPeriodosRespondidos(user).then(function sucesso(response){
                        $this.setUsuarioInterno(response.data);
                        
                        console.log(" $this.getUsuario",  $this.getUsuario());
                    },function falha(){
                        console.log("Ocorreu uma falha ao setar usuário");
                    });
                };

            });


})();
