(function() {
    'use strict';
    angular
        .module('app')
        .controller('AutorizacaoPOSListController', AutorizacaoPOSListController);

    AutorizacaoPOSListController.$inject = ['$scope', '$state', '$stateParams', 'autorizacaoList', 'autorizacaoPOSService' ];

    /* @ngInject */
    function AutorizacaoPOSListController($scope, $state, $stateParams, autorizacaoList, autorizacaoPOSService) {
        //var ctrl = this;
        //$scope.listarPropostas = listarPropostas;
        //$scope.editar = editar;
        $scope.autorizacaoList = autorizacaoList;


        var doSearch = ionic.debounce(function(query) {
            Flickr.search(query).then(function(resp) {
              $scope.photos = resp;
            });
          }, 500);
  
        $scope.search = function() {
          doSearch($scope.query);
        }

        
  }

})();



(function() {
    'use strict';
    angular
        .module('app')
        .controller('AutorizacaoPOSEntryController', AutorizacaoPOSEntryController);

    AutorizacaoPOSEntryController.$inject = ['$scope', '$state', '$stateParams', 'autorizacaoPOSService', 'autorizacao', '$ionicPopup','$timeout'];

    function AutorizacaoPOSEntryController($scope, $state, $stateParams, autorizacaoPOSService, autorizacao, $ionicPopup,$timeout) {
        //var ctrl = this;
        //$scope.limpar = limpar;
        //$scope.save = save;
        $scope.autorizacao = autorizacao;
        $scope.filtro = {}





        // Triggered on a button click, or some other target
        $scope.confirma = function confirma(oid) {
         
          $scope.filtro = oid;
          // An elaborate, custom popup
          var myPopup = $ionicPopup.show({
            template: '<div class="list"><label class="item item-input"><span class="input-label">Senha</span><input type="password" placeholder="senha" ng-model="filtro.senha"></label></div>',
            title: 'Confirma Transação',
            subTitle: 'Informe seus dados',
            scope: $scope,
            buttons: [
              { text: 'Cancel' },
              {
                text: '<b>Confirmar</b>',
                type: 'button-positive',
                onTap: function(e) {
                  if (!$scope.filtro.senha) {
                    //don't allow the user to close unless he enters wifi password
                    e.preventDefault();
                  } else {
                    autorizacaoPOSService.confirma($scope.filtro).save();
                    myPopup.close();
                  
                  }
                }
              },
            ]
          });
         
         };



        // Triggered on a button click, or some other target
        $scope.cancela = function cancela(oid) {
         
          $scope.filtro = oid;
          // An elaborate, custom popup
          var myPopup = $ionicPopup.show({
          
            template: '<div class="list"><label class="item item-input"><span class="input-label">Senha</span><input type="password" placeholder="senha" ng-model="filtro.senha"></label><label class="item item-input"><span class="input-label">Motivo</span><input type="text" placeholder="motivo" ng-model="filtro.motivoCancelamento"></label></div>',
            title: 'Confirma Cancelamento Transação',
            subTitle: 'Informe seus dados',
            scope: $scope,
            buttons: [
              { text: 'Cancel' },
              {
                text: '<b>Confirmar</b>',
                type: 'button-positive',
                onTap: function(e) {
                  if (!$scope.filtro.senha || !$scope.filtro.motivoCancelamento) {
                    //don't allow the user to close unless he enters wifi password
                    e.preventDefault();
                  } else {
                    autorizacaoPOSService.cancela($scope.filtro).save();
                    myPopup.close();
                  
                  }
                }
              },
            ]
          });
         
         };





    }

})();