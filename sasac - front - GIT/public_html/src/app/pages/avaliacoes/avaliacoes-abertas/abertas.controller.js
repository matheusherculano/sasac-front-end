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
        $this.usuario = $this.usuarioService.getUsuario();

        $this.getPublic();
    }

    abertasController.prototype.getPublic = function () {
        var $this = this;

        var sucesso = function (response) {
            var avaliacao = response.data;

            angular.forEach(avaliacao, function (item, key) {
                var keep = true;
                angular.forEach($this.usuario.periodosRespondidos, function (usuario, keyUser) {
                    if (keep) {
                        if (item.ultimoPeriodo != null && item.ultimoPeriodo.id == usuario.id) {
                            item['respondido'] = true;
                            keep = false;
                        } else {
                            item['respondido'] = false;
                        }
                    }

                });
            });

            $this.avaliacao = avaliacao;
            console.log("avaliacao;", avaliacao);
        };
        var falha = function () {
            $this.toastr.error("Falha ao carregar as pesquisas.");
        };
        $this.avaliacaoService.getPublic(true).then(sucesso, falha);
    };
    
    abertasController.prototype.open = function (page, size, idAvaliacao, idPeriodo) {
        var $this = this;
        
        var resposta = {
            idPeriodo:idPeriodo.id,
            idUsuario:$this.usuario.id
        };

        $this.$uibModal.open({
            animation: true,
            templateUrl: page,
            size: size,
            controller: 'ModalAbertaCtrl',
            controllerAs: '$ctrl',
            resolve: {
                avaliacao: $this.avaliacaoService.getById(idAvaliacao),
                resposta: resposta
            }
        });
    };

})();
