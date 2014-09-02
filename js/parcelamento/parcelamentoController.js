(function() {
    'use strict';
    angular
        .module('app')
        .controller('ParcelamentoListController', ParcelamentoListController);

    ParcelamentoListController.$inject = ['$scope', '$state', '$stateParams', 'parcelamentoService', 'parcelamentoList'];

    /* @ngInject */
    function ParcelamentoListController($scope, $state, $stateParams, parcelamentoService, parcelamentoList) {
        //var ctrl = this;
        //$scope.listarPropostas = listarPropostas;
        //$scope.editar = editar;
        $scope.filtro = {};
        $scope.parcelamentoList = parcelamentoList;
        //      $scope.simulaParceladoEmissor = function simulaParceladoEmissor(parcelamento) {
        //         $scope.parcelamento = parcelamentoService.simulaParceladoEmissor(parcelamento).query();
        //         $state.go('parcelamento.list');
        //       };
    }

})();



(function() {

    angular
        .module('app')
        .controller('ParcelamentoEntryController', ParcelamentoEntryController);

    ParcelamentoEntryController.$inject = ['$scope', '$state', '$stateParams', 'parcelamentoService', 'parcela'];

    function ParcelamentoEntryController($scope, $state, $stateParams, parcelamentoService, parcela) {
        //var ctrl = this;
        //$scope.limpar = limpar;
        //$scope.save = save;
        $scope.parcela = parcela;

    }

})();