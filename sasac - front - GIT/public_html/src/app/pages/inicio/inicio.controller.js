(function () {
  'use strict';

  angular.module('BlurAdmin.pages.inicio.controller', [])
      .controller('inicioController', inicioController);

  /** @ngInject */
  function inicioController(usuarioService, toastr, $state) {
      this.usuarioService = usuarioService;
      this.toastr = toastr;
      this.$state = $state;
      
      var $this = this;
      $this.usuarios = [];
      
      $this.getAll();
      
  }
  
    inicioController.prototype.getAll = function(){
      var $this = this;
      
      var sucesso = function(response){
          $this.usuarios = response.data;
      };
      var falha = function(){
           $this.toastr.error("Falha ao carregar os usuários");
      };
      
      $this.usuarioService.getAll().then(sucesso, falha);
    };
    
    inicioController.prototype.setUsuario = function (usuario){
      var $this = this;
      
      $this.usuarioService.setUsuario(usuario);
    };
  

})();
