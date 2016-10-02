(function () {
  'use strict';

  angular.module('BlurAdmin.pages.inicio.controller', [])
      .controller('inicioController', inicioController);

  /** @ngInject */
  function inicioController(usuarioService, toastr, $state) {
      this.usuarioService = usuarioService;
      this.toastr = toastr;
      this.$state = $state;
      
      alert();
      var $this = this;
      
      
  }
  

})();
