(function () {
    'use strict';
    angular.module('BlurAdmin.pages.gerenciamento.modalController', [])
            .controller('ModalInstanceCtrl', ModalInstanceCtrl)
            .controller('ModalDeleteCtrl', ModalDeleteCtrl);


    /** @ngInject */
    function ModalInstanceCtrl(
            $uibModalInstance,
            avaliacao,
            utilService,
            repeticoes,
            editavel,
            avaliacaoService,
            toastr,
            $state) {


        var $ctrl = this;

        $ctrl.repeticoes = repeticoes.data;
        $ctrl.editavel = editavel;

        avaliacao.data.dt_disponibilidade = utilService.getDate(avaliacao.data.dt_disponibilidade);

        $ctrl.obj = avaliacao.data;
        $ctrl.obj.repeticao.id = avaliacao.data.repeticao.id;

        console.log("$ctrl.obj", $ctrl.obj)


        //atualizar avaliação
        $ctrl.update = function (obj) {

            avaliacaoService.update(obj).then(function () {
                toastr.success("Avaliação editada com sucesso");
                $uibModalInstance.close();
                $state.reload();
            }, function () {
                toastr.error("Ocorreu um erro ao salvar.");
            });
        };


    }

    /** @ngInject */
    function ModalDeleteCtrl(
            idAvaliacao,
            avaliacaoService,
            toastr,
            $state) {

        var $ctrl = this;

        $ctrl.deletar = function () {
            console.log("id", idAvaliacao);
            
            var sucesso = function(){
                toastr.success("Avaliação excluída com sucesso!");
                $state.reload();
            };
            
            var falha = function(response){
                toastr.error(response.message);
            };
            
            avaliacaoService.deletar(idAvaliacao).then(sucesso, falha);
        };

    }

})();
