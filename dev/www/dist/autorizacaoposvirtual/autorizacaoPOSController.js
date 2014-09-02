/*! portal-emissor-mobile v1.0.0 | (c) 2014 edersonbuss |  */
(function () {
    'use strict';
  angular
    .module('app')
    .controller('AutorizacaoPOSListController', AutorizacaoPOSListController);

  AutorizacaoPOSListController.$inject = ['$scope', '$state', '$stateParams', 'autorizacao','autorizacaoPOSService'];

    /* @ngInject */
  function AutorizacaoPOSListController ($scope, $state, $stateParams, autorizacao, autorizacaoPOSService) { 
        //var ctrl = this;
        //$scope.listarPropostas = listarPropostas;
        //$scope.editar = editar;
        $scope.autorizacao = autorizacao;

       

        
  }

})();



(function () {
    'use strict';
  angular
    .module('app')
    .controller('AutorizacaoPOSEntryController', AutorizacaoPOSEntryController);

  AutorizacaoPOSEntryController.$inject = ['$scope', '$state', '$stateParams', 'autorizacaoPOSService'];

  function AutorizacaoPOSEntryController ($scope, $state, $stateParams, autorizacaoPOSService) { 
        //var ctrl = this;
        //$scope.limpar = limpar;
        //$scope.save = save;
        //$scope.autorizacao = autorizacao;

       

        
  }

})();

