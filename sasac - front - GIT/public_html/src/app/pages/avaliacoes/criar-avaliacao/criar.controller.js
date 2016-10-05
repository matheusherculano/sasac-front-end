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
            usuarioService,
            $q) {
        this.repeticaoService = repeticaoService;
        this.avaliacaoService = avaliacaoService;
        this.toastr = toastr;
        this.$state = $state;
        this.usuarioService = usuarioService;
        this.$q = $q;

        var $this = this;
        
        $this.usuario = $this.usuarioService.getUsuario().id;

        $this.repeticaoService.getRepeticao().then(function (response) {
            console.log("repeteco ", response);
            $this.repeticoes = response.data;
        }, function () {
            console.error("Falha ao recuperar as repetições")
        });

    }

    criarController.prototype.salvar = function (form, obj) {
        var $this = this;

        var formValido = function () {

            obj['usuarioCriador'] = {id: $this.usuarioService.getIdUsuario()};
            
            var sucesso = function () {
                $this.toastr.success("Avaliação criada com sucesso. Aguarde a aprovação");
                $this.$state.go('avaliacao.abertas');
            };

            var falha = function () {
                $this.toastr.error("Falha ao criar a Avaliação");
            };

            $this.avaliacaoService.save(obj).then(sucesso, falha);
        };

        var formInvalido = function () {
            $this.toastr.error("Preencha os campos obrigatórios");
        };

        $this.validateForm(form).then(formValido, formInvalido);
    };

    criarController.prototype.validateForm = function (form) {
        var defer = this.$q.defer();

        if (form.$invalid) {
            angular.forEach(form.$error.required, function (item) {
                if (item.$invalid) {
                    item.$touched = true;
                }
            });

            defer.reject();
        } else {
            defer.resolve();
        }

        return defer.promise;
    };

})();
