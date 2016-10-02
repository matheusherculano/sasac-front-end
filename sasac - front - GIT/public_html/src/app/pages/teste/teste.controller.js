(function () {
  'use strict';

  angular.module('BlurAdmin.pages.teste.controller', [])
      .controller('testeController', testeController);

  /** @ngInject */
  function testeController($http, api, repeticaoService) {
    
    
      var $this = this;
      
      $this.testar = function(){
          var data = {
              idUsuario : 1,
              idPeriodo : 1,
              resposta : "pos"
          };
          $http.post(api.url+"/periodo/teste", data).then(function (response){
              console.log("certo");
          }, function (response){
              console.log("errado ", response);
          });
      };
    
  }

})();
