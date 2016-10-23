(function () {
    'use strict';

    angular.module('BlurAdmin.pages.avaliacao.grafico.controller', [])
            .controller('graficoController', graficoController);

    /** @ngInject */
    function graficoController(
            avaliacaoService,
            toastr,
            $state,
            $q,
            $scope,
            graficoService) {
        this.avaliacaoService = avaliacaoService;
        this.toastr = toastr;
        this.$state = $state;
        this.$q = $q;
        this.$scope = $scope;
        this.graficoService = graficoService;

        var $this = this;
        $this.indicadores = {
            periodos: null,
            indicador: null,
            proporcional: null
        };


        $this.getDadosGrafico();
        

        $this.changeData = function (points, evt) {
            var $this = this;

            console.log("points", points);

            var total = points[0].value + points[1].value + points[2].value;

            var porcPositivas = ((points[0].value / total) * 100).toFixed(2);
            var porcNeutras = ((points[1].value / total) * 100).toFixed(2);
            var porcNegativas = ((points[2].value / total) * 100).toFixed(2);

            $scope.pizzaData = [
                porcPositivas,
                porcNeutras,
                porcNegativas
            ];
            
            $scope.labelPizza = points[0].label;

            
            console.log(" $this.pizzaData", $this.pizzaData);

        };


    }

    graficoController.prototype.getDadosGrafico = function () {
        var $this = this;


        var sucesso = function (response) {
            var dados = response.data;
            $this.titulo = dados.titulo;

            $this.indicadores = $this.graficoService.calcularPesquisa(dados);
            

            var positivas = [];
            var neutras = [];
            var negativas = [];

            console.log("dados", response.data);

            //legenda do grafico
            $this.labels = $this.getLegendaRepeticao(dados.repeticao.repeticao, dados.periodos.length);
            //setando indicador
            $this.indicadores.periodos = dados.periodos.length;

            //legenda na curva
            $this.series = ['Positivas', 'Negativas', 'Neutras'];

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

            //total de respostas do ultimo periodo
            var totalUltimoPeriodo = dados.periodos[dados.periodos.length - 1].respostasNegativas +
                    dados.periodos[dados.periodos.length - 1].respostasNeutras +
                    dados.periodos[dados.periodos.length - 1].respostasPositivas;

            /**
             *Porcentagem das respostas do ultimo periodo:
             *postivias, negativas e neutras 
             */
            var porcPositivas = ((dados.periodos[dados.periodos.length - 1].respostasPositivas / totalUltimoPeriodo) * 100).toFixed(2);
            var porcNeutras = ((dados.periodos[dados.periodos.length - 1].respostasNeutras / totalUltimoPeriodo) * 100).toFixed(2);
            var porcNegativas = ((dados.periodos[dados.periodos.length - 1].respostasNegativas / totalUltimoPeriodo) * 100).toFixed(2);

            $this.pizzaLabel = ["Postivas", "Negativas", "Neutras"];

            $this.$scope.pizzaData = [
                porcPositivas,
                porcNeutras,
                porcNegativas
            ];

            $this.$scope.labelPizza = $this.labels[$this.labels.length -1];
            
            $this.options = {
                segmentShowStroke: true
            };

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
