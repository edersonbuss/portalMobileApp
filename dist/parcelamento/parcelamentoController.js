/*! portal-emissor-mobile v1.0.0 | (c) 2014 edersonbuss |  */
(function () {
    'use strict';
  angular
    .module('app')
    .controller('ParcelamentoListController', ParcelamentoListController);

ParcelamentoListController.$inject = ['$scope', '$state', '$stateParams', 'parcelamentoService','parcelamento'];

    /* @ngInject */
  function ParcelamentoListController ($scope, $state, $stateParams, parcelamentoService,parcelamento) { 
        //var ctrl = this;
        //$scope.listarPropostas = listarPropostas;
        //$scope.editar = editar;
	  $scope.filtro ={};
	  $scope.parcelamento = parcelamento;

//      $scope.simulaParceladoEmissor = function simulaParceladoEmissor(parcelamento) {
//         $scope.parcelamento = parcelamentoService.simulaParceladoEmissor(parcelamento).query();
//         $state.go('parcelamento.list');
//       };
       

        
  }

})();



(function () {
    
  angular
    .module('app')
    .controller('ParcelamentoEntryController', ParcelamentoEntryController);

 ParcelamentoEntryController.$inject = ['$scope', '$state', '$stateParams', 'parcelamentoService'];

  function ParcelamentoEntryController ($scope, $state, $stateParams, parcelamentoService) { 
        //var ctrl = this;
        //$scope.limpar = limpar;
        //$scope.save = save;
      
        
       


        
  }

})();

