(function () {
    'use strict';

    angular.module('BlurAdmin.pages.avaliacao.abertas.modal', [])
            .controller('ModalAbertaCtrl', ModalAbertaCtrl);

    /** @ngInject */
    function ModalAbertaCtrl(
            $uibModalInstance,
            avaliacao,
            resposta,
            utilService,
            avaliacaoService,
            toastr,
            $state) {

        this.resposta = resposta;
        var $ctrl = this;

        $ctrl.obj = avaliacao.data;

        //atualizar avaliação
        $ctrl.responder = function (obj) {
            $ctrl.resposta['resposta'] = obj;

            avaliacaoService.responder(resposta).then(function () {
                toastr.success("Resposta registrada.");
                $uibModalInstance.close();
                $state.reload();
            }, function () {
                toastr.error("Ocorreu um erro ao registrar a resposta.");
            });
        };


    }
})();
