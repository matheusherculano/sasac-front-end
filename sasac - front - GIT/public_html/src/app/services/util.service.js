(function () {
    'use strict';

    angular.module('Services.util', [])
            .service('utilService', function () {
                var $this = this;

                $this.getDate = function (data) {
                    var ano = data.substring(0, 4);
                    var mes = data.substring(5, 7);
                    var dia = data.substring(8, 10);
                    return new Date(ano, mes - 1, dia);
                };
            });


})();
