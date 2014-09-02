(function() {
    'use strict';
    angular
        .module('app')
        .controller('PropostaListController', PropostaListController);

    PropostaListController.$inject = ['$scope', '$state', '$stateParams', 'propostaList', 'propostaService'];

    /* @ngInject */
    function PropostaListController($scope, $state, $stateParams, propostaList, propostaService) {
        //var ctrl = this;
        //$scope.listarPropostas = listarPropostas;
        //$scope.editar = editar;
        $scope.propostas = propostaList;

        $scope.listarPropostas = function listarPropostas() {
            $scope.propostas = propostaService.query($stateParams);
        }

        $scope.editar = function editar(proposta) {
            $state.go('^.entry', {
                id: proposta.id
            });
        }

    }

})();




(function() {
    'use strict';
    angular
        .module('app')
        .controller('PropostaEntryController', PropostaEntryController);

    PropostaEntryController.$inject = ['$scope', '$state', '$stateParams', 'propostaService', 'proposta'];

    function PropostaEntryController($scope, $state, $stateParams, propostaService, proposta) {
        //var ctrl = this;
        //$scope.limpar = limpar;
        //$scope.save = save;
        $scope.proposta = proposta;

        $scope.limpar = function limpar() {
            $scope.proposta = null;
        }

        $scope.save = function save(proposta) {
            if ($scope.proposta.id) {

                propostaService.update({
                    oid: null
                }, $scope.proposta);

            } else {
                propostaService.save({}, $scope.proposta);
            }
        }


    }

})();