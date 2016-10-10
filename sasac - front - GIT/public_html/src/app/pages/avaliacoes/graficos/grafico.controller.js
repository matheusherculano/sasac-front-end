(function () {
    'use strict';

    angular.module('BlurAdmin.pages.avaliacao.grafico.controller', [])
            .controller('graficoController', graficoController);

    /** @ngInject */
    function graficoController(
            avaliacaoService,
            toastr,
            $state,
            $q) {
        this.avaliacaoService = avaliacaoService;
        this.toastr = toastr;
        this.$state = $state;
        this.$q = $q;

        var $this = this;

        $this.getDadosGrafico();


//        $this.labels = ["May", "June", "Jule", "August", "September", "October", "November", "October", "November"];



    }

    graficoController.prototype.getDadosGrafico = function () {
        var $this = this;

        var sucesso = function (response) {
            var dados = response.data;

            var positivas = [];
            var neutras = [];
            var negativas = [];

            console.log("dados", response.data);

            //legenda do grafico
            $this.labels = $this.getLegendaRepeticao(dados.repeticao.repeticao, dados.periodos.length);
            //legenda na curva
            $this.series = ['Positivas', 'Neutras', 'Negativas'];

            //respostas positivas
            angular.forEach(dados.periodos, function (item) {
                positivas.push(item['respostasPositivas']);
            });
            //respostas neutras
            angular.forEach(dados.periodos, function (item) {
                neutras.push(item['respostasNeutras']);
            });
            //respostas negativas
            angular.forEach(dados.periodos, function (item) {
                negativas.push(item['respostasNegativas']);
            });
            
            //dados do grafico
            $this.data = [
                positivas,
                negativas,
                neutras
            ];
        };

        var falha = function () {
            $this.toastr.error("Falha ao recuperar dados do resultado");
        };

        $this.avaliacaoService.getDadosGrafico($this.$state.params.idAvaliacao).then(sucesso, falha);
    };

    graficoController.prototype.getLegendaRepeticao = function (tipoRepeticao, periodos) {
        var repeticao;
        var legenda = [];

        switch (tipoRepeticao) {
            case "Semanal":
                repeticao = "semana";
                break;
            case "Mensal":
                repeticao = "mês";
                break;
            case "Bimestral":
                repeticao = "bimestre";
                break;
            case "Trimestral":
                repeticao = "trimestre";
                break;
            case "Semestral":
                repeticao = "semestre";
                break;
            case "Anual":
                repeticao = "ano";
        }

        for (var i = 1; i <= periodos; i++) {
            legenda.push(i + "°/" + repeticao);
        }

        return legenda;
    };


})();
