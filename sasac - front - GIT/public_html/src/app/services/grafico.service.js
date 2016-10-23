(function () {
    'use strict';

    angular.module('Services.grafico', [])
            .service('graficoService', function ($http, api) {
                var $this = this;

                $this.indicadores = {
                    periodos: null,
                    indicador: null,
                    proporcional: null
                };


                $this.calcularPesquisa = function (dados) {
                    var $this = this;

                    //resetando parametros
                    $this.indicadores = {
                        periodos: null,
                        indicador: null,
                        proporcional: null
                    }

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

                        if (respostasPositivas == respostasNegativas) {
                            $this.indicadores.indicador = "Razoavel";
                        } else if (respostasPositivas > 0.5) {
                            $this.indicadores.indicador = "Razoavel";
                        } else if (respostasNegativas > 0.5) {
                            $this.indicadores.indicador = "Atenção";
                        } else {
                            $this.indicador = "Dados insuficientes";
                        }

                    } else if (tamanho > 1) {// mais de um periodo

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


                    return $this.indicadores;
                };

            });


})();
