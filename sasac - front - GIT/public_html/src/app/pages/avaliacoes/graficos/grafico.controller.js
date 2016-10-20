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
        $this.indicadores = {
            periodos: null,
            indicador: null,
        };


        $this.getDadosGrafico();


    }
    graficoController.prototype.calcularPesquisa = function (dados) {
        var $this = this;
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

        function getIndicador(tipo, porcentagem) {
            if (tipo == "positivo") {
                if (porcentagem < 0.5) {
                    return "Atenção";
                } else if (porcentagem >= 0.5 && porcentagem <= 0.64) {
                    return "Razoavel";
                } else if (porcentagem >= 0.65 && porcentagem <= 0.84) {
                    return "Bom";
                } else if (porcentagem >= 0.85 && porcentagem <= 1) {
                    return "Excelente";
                }

            } else if (tipo == "negativo") {
                if (porcentagem >= 0 && porcentagem <= 0.15) {
                    return "Excelente";
                } else if (porcentagem >= 0.16 && porcentagem <= 0.35) {
                    return "Bom";
                } else if (porcentagem >= 0.36 && porcentagem <= 0.5) {
                    return "Razoavel";
                } else if (porcentagem > 0.5) {
                    return "Atenção";
                }
            }
        }

        //Se tiver um periodo
        if (tamanho == 1 && tamanho != 0) {
            console.log("tam 1");
            var total = dados.periodos[0].respostasPositivas + dados.periodos[0].respostasNeutras + dados.periodos[0].respostasNegativas;

            //conversão para porcentagem
            var respostasPositivas = (dados.periodos[0].respostasPositivas / total);
            var respostasNegativas = (dados.periodos[0].respostasNegativas / total);

            if(respostasPositivas == respostasNegativas){
                $this.indicadores.indicador = "Razoavel";
            }
            else if (respostasPositivas > 0.5) {
                $this.indicadores.indicador = "Razoavel";
            }
            else if (respostasNegativas > 0.5) {
                $this.indicadores.indicador = "Atenção";
            } else {
                $this.indicador = "Dados insuficientes";
            }

        }
        else if (tamanho > 1) {// mais de um periodo

            //total de respostas ultimo periodo
            var totalUltimo = dados.periodos[tamanho - 1].respostasPositivas
                    + dados.periodos[tamanho - 1].respostasNeutras +
                    dados.periodos[tamanho - 1].respostasNegativas;

            //verificar se a variação é proporcional nos 2 ultimos periodos 
            var proporcional = (dados.periodos[tamanho - 2].respostasPositivas / dados.periodos[tamanho - 2].respostasNegativas) //-2 pois o array começa com 0
                    == (dados.periodos[tamanho - 1].respostasPositivas / dados.periodos[tamanho - 1].respostasNegativas);

            //indicador proporcional
//            if (proporcional) {//periodos proporcionais
//                $this.indicadores.indicador = "Variação proporcional";
//                
            var porcentagemPositiva = (dados.periodos[tamanho - 1].respostasPositivas / totalUltimo);
            var porcentagemNegativa = (dados.periodos[tamanho - 1].respostasNegativas / totalUltimo);

            //criação de indicadores
            if (porcentagemPositiva > porcentagemNegativa) {
                $this.indicadores.indicador = getIndicador("positivo", porcentagemPositiva);

            } else if (porcentagemNegativa > porcentagemPositiva) {
                $this.indicadores.indicador = getIndicador("positivo", porcentagemPositiva);
            }

            if (proporcional) {//periodos proporcionais
                $this.indicadores.proporcional = "Variação proporcional ao periodo anterior";
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

            $this.pizzaData = [
                porcPositivas,
                porcNeutras,
                porcNegativas
            ];

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
