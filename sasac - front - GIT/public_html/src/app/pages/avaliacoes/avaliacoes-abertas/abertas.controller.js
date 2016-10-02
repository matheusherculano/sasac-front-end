(function () {
    'use strict';

    angular.module('BlurAdmin.pages.avaliacao.abertas.controller', [])
            .controller('abertasController', abertasController);

    /** @ngInject */
    function abertasController(
            avaliacaoService,
            $state,
            toastr,
            $uibModal,
            $scope,
            utilService,
            usuarioService) {

        this.avaliacaoService = avaliacaoService;
        this.$state = $state;
        this.toastr = toastr;
        this.$uibModal = $uibModal;
        this.$scope = $scope;
        this.utilService = utilService;
        this.usuarioService = usuarioService;

        var $this = this;
        $this.avaliacao = [];
        
        $this.getPublic();
    }
    
    abertasController.prototype.getPublic = function (){
        var $this = this;
        
        var sucesso = function (response) {
            $this.avaliacao = response.data;
            
            console.log("response.data;", response.data);
        };
        var falha = function () {
            $this.toastr.error("Falha ao carregar as pesquisas.");
        };
        $this.avaliacaoService.getPublic(true).then(sucesso, falha);
    };

})();
