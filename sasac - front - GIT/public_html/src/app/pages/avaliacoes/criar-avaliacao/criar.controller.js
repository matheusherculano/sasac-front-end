(function () {
    'use strict';

    angular.module('BlurAdmin.pages.avaliacao.criar.controller', [])
            .controller('criarController', criarController);

    /** @ngInject */
    function criarController(
            repeticaoService,
            avaliacaoService,
            toastr,
            $state,
            usuarioService) {
        this.repeticaoService = repeticaoService;
        this.avaliacaoService = avaliacaoService;
        this.toastr = toastr;
        this.$state = $state;
        this.usuarioService = usuarioService;

        var $this = this;

        $this.repeticaoService.getRepeticao().then(function (response) {
            console.log("repeteco ", response);
            $this.repeticoes = response.data;
        }, function () {
            console.error("Falha ao recuperar as repetições")
        });

    }

    criarController.prototype.salvar = function (obj) {
        var $this = this;
        obj['usuarioCriador']= {id : $this.usuarioService.getUsuario().id};
        console.log(obj);
        var sucesso = function () {
            $this.toastr.success("Avaliação criada com sucesso. Aguarde a aprovação");
            $this.$state.go('avaliacao.abertas');
        };

        var falha = function () {
            $this.toastr.error("Falha ao criar a Avaliação");
        };

        $this.avaliacaoService.save(obj).then(sucesso, falha);
    };

})();
