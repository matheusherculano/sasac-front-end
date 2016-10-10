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
            $state,
            usuarioService) {

        this.resposta = resposta;
        this.usuarioService = usuarioService;
        var $ctrl = this;

        $ctrl.obj = avaliacao.data;

        //atualizar avaliação
        $ctrl.responder = function (obj, form) {
            if (form.$invalid) {
                toastr.error("Selecione a resposta.");
            } else {

                $ctrl.resposta['resposta'] = obj;
                
                if($ctrl.resposta.idUsuario == undefined || $ctrl.resposta.idUsuario == null){
                    $ctrl.usuario = $ctrl.usuarioService.getUsuario();
                    $ctrl.resposta['idUsuario'] =  $ctrl.usuario.id;
                }
                

                avaliacaoService.responder(resposta).then(function () {
                    toastr.success("Resposta registrada.");
                    $uibModalInstance.close();
                    $state.go('avaliacao.obrigado');
                }, function () {
                    toastr.error("Ocorreu um erro ao registrar a resposta.");
                });
            }
        };


    }
})();
