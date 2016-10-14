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


    }
    graficoController.prototype.calcularPesquisa = function (dados) {
        var defer = this.$q.defer();
        var tamanho = dados.periodos.length;

        function escalaCrescente(ultimo, penultimo) {
            if (ultimo > penultimo) {
                return true;
            } else if (penultimo > ultimo) {
                return false;
            } else {
                return false;
            }
        }
        
        function getIndicador(){
            
        }

        //Se tiver um periodo
        if (tamanho == 1 && tamanho != 0) {
            console.log("tam 1");
            var total = dados.periodos[0].respostasPositivas + dados.periodos[0].respostasNeutras + dados.periodos[0].respostasNegativas;

            //conversão para porcentagem
            var respostasPositivas = (dados.periodos[0].respostasPositivas / total);
            var respostasNegativas = (dados.periodos[0].respostasNegativas / total);

            if (respostasPositivas > 0.5) {
                console.log("indicador positivo");
            }
            else if (respostasNegativas > 0.5) {
                console.log("indicador negativo");
            } else {
                console.log("sem indicador");
            }

            console.log("total", total);
        }
        else if (tamanho > 1) {// mais de um periodo
            //
            //verificar se a variação é proporcional nos 2 ultimos periodos 
            var proporcional = (dados.periodos[tamanho - 2].respostasPositivas / dados.periodos[tamanho - 2].respostasNegativas) //-2 pois o array começa com 0
                    == (dados.periodos[tamanho - 1].respostasPositivas / dados.periodos[tamanho - 1].respostasNegativas);

            if (proporcional) {//periodos proporcionais
                console.log("Nada mudou");
            } else {//não proporcionais
                
                if (escalaCrescente(dados.periodos[tamanho - 1].respostasPositivas,
                        dados.periodos[tamanho - 2].respostasPositivas)) {
                    
                    console.log("crescente positivas");
                }
            }
        }


        defer.resolve();
        return defer.promise;
    };

    graficoController.prototype.getDadosGrafico = function () {
        var $this = this;


        var sucesso = function (response) {
            var dados = response.data;
            $this.titulo = dados.titulo;

            $this.calcularPesquisa(dados).then();

            var positivas = [];
            var neutras = [];
            var negativas = [];

            console.log("dados", response.data);

            //legenda do grafico
            $this.labels = $this.getLegendaRepeticao(dados.repeticao.repeticao, dados.periodos.length);
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
