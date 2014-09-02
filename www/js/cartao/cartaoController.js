(function() {
    'use strict';
    angular
        .module('app')
        .controller('CartaoListController', CartaoListController);

    CartaoListController.$inject = ['$scope', '$state', '$stateParams', 'cartaoList', 'cartaoService'];

    /* @ngInject */
    function CartaoListController($scope, $state, $stateParams, cartaoList, cartaoService) {
        //var ctrl = this;
        //$scope.listarPropostas = listarPropostas;
        //$scope.editar = editar;
        $scope.cartoes = cartaoList;

    }

})();



(function() {
    'use strict';
    angular
        .module('app')
        .controller('CartaoEntryController', CartaoEntryController);

    CartaoEntryController.$inject = ['$scope', '$state', '$stateParams', 'cartaoService', 'cartao'];

    function CartaoEntryController($scope, $state, $stateParams, cartaoService, cartao) {
        //var ctrl = this;
        //$scope.limpar = limpar;
        //$scope.save = save;
        $scope.cartao = cartao;

    }

})();