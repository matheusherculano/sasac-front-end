(function () {
    'use strict';
    angular.module('BlurAdmin.pages.gerenciamento.controller', [])
            .controller('gerenciamentoController', gerenciamentoController)

    /** @ngInject */
    function gerenciamentoController(
            avaliacaoService,
            $state,
            toastr,
            $uibModal,
            $scope,
            utilService,
            repeticaoService,
            graficoService) {
        this.avaliacaoService = avaliacaoService;
        this.$state = $state;
        this.toastr = toastr;
        this.$uibModal = $uibModal;
        this.$scope = $scope;
        this.utilService = utilService;
        this.repeticaoService = repeticaoService;
        this.graficoService = graficoService;


        var $this = this;
        $this.smartTablePageSize = 10;
        $this.avaliacao = [];

        $this.getAll();
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
            
            angular.forEach($this.avaliacao, function(item){
                console.log("log", $this.graficoService.calcularPesquisa(item));
                
                item['indicadores'] = $this.graficoService.calcularPesquisa(item);
            });
            
            
            console.log($this.avaliacao);
        };
        var falha = function () {
            $this.toastr.error("Falha ao carregar as pesquisas.");
        };
        $this.avaliacaoService.getAll().then(sucesso, falha);
    };
    
    gerenciamentoController.prototype.open = function (page, size, idAvaliacao, editavel) {
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
                repeticoes: $this.repeticaoService.getRepeticao(),
                editavel: editavel
            }
        });
    };
})();
