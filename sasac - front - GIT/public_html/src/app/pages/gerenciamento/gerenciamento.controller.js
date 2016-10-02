(function () {
    'use strict';
    angular.module('BlurAdmin.pages.gerenciamento.controller', [])
            .controller('gerenciamentoController', gerenciamentoController)
            .controller('ModalInstanceCtrl', ModalInstanceCtrl);

    /** @ngInject */
    function gerenciamentoController(
            avaliacaoService,
            $state,
            toastr,
            $uibModal,
            $scope,
            utilService,
            repeticaoService) {
        this.avaliacaoService = avaliacaoService;
        this.$state = $state;
        this.toastr = toastr;
        this.$uibModal = $uibModal;
        this.$scope = $scope;
        this.utilService = utilService;
        this.repeticaoService = repeticaoService;


        var $this = this;
        $this.smartTablePageSize = 10;
        $this.avaliacao = [];

        $this.getAll();
    }

    /** @ngInject */
    function ModalInstanceCtrl($uibModalInstance, avaliacao, utilService, repeticoes) {
        var $ctrl = this;

        avaliacao.data.dt_disponibilidade = utilService.getDate(avaliacao.data.dt_disponibilidade);
        
        $ctrl.obj = avaliacao.data;
        $ctrl.obj.repeticao.id = avaliacao.data.repeticao.id;

        console.log("$ctrl.obj", $ctrl.obj)

        $ctrl.ok = function () {
            $uibModalInstance.close($ctrl.selected.item);
        };

        $ctrl.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };
    }

    gerenciamentoController.prototype.setPublicacao = function (idAvaliacao, publicado) {
        var $this = this;
        var sucesso = function (response) {

        };
        var falha = function () {
            $this.toastr.error("Falha a mudar estado de publicação da pesquisa.");
        };
        $this.avaliacaoService.setPublicacao(idAvaliacao).then();
        $this.$state.reload();
        $this.toastr.success("Publicação alterada com sucesso.");
    };
    gerenciamentoController.prototype.getAll = function () {
        var $this = this;
        var sucesso = function (response) {
            $this.avaliacao = response.data;
            $this.gridDisponivel = true;
            console.log(response.data);
        };
        var falha = function () {
            $this.toastr.error("Falha ao carregar as pesquisas.");
        };
        $this.avaliacaoService.getAll().then(sucesso, falha);
    };
    gerenciamentoController.prototype.open = function (page, size, idAvaliacao) {
        var $this = this;

        $this.repeticaoService.getRepeticao().then(function (response) {
            $this.repeticoes = response.data;
        }, function () {
            console.error("Falha ao recuperar as repetições");
        });

        $this.$uibModal.open({
            animation: true,
            templateUrl: page,
            size: size,
            controller: 'ModalInstanceCtrl',
            controllerAs: '$ctrl',
            resolve: {
                avaliacao: $this.avaliacaoService.getById(idAvaliacao),
                repeticoes: $this.repeticaoService.getRepeticao()
            }
        });
    };
})();
