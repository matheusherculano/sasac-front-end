(function () {
    'use strict';

    angular.module('BlurAdmin.pages.avaliacao.manter.controller', [])
            .controller('manterController', manterController);

    /** @ngInject *
     * @param {type} avaliacaoService
     * @param {type} $state
     * @param {type} toastr
     * @param {type} $uibModal
     * @param {type} $scope
     * @param {type} utilService
     * @returns {manter.controller_L1.manterController}
     */
    function manterController(
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
        
        //carregar avaliações do usuário
        $this.getByUser();

    }


    manterController.prototype.getByUser = function () {
        var $this = this;
        var usuario = $this.usuarioService.getUsuario();
        
        var sucesso = function (response) {
            $this.avaliacao = response.data;
            $this.gridDisponivel = true;
            console.log(response.data);
        };
        var falha = function () {
            $this.toastr.error("Falha ao carregar as pesquisas.");
        };
        
        console.log("usuario.id",usuario.id)
        console.log("usuario",usuario)
        $this.avaliacaoService.getByUser(usuario).then(sucesso, falha);
    };

})();
