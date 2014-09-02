/*! portal-emissor-mobile v1.0.0 | (c) 2014 edersonbuss |  */
// 'use strict';
// appControllers.controller('HomeController', ['$scope','$ionicViewService',
//     function HomeController($scope,$ionicViewService) {
//     	// This a temporary solution to solve an issue where the back button is displayed when it should not be.
//  	// This is fixed in the nightly ionic build so the next release should fix the issue
//  	// Esta é uma solução temporária para resolver um problema em que o botão de volta é exibido quando não deveria ser. 
//   // Este é fixo na construção iônica noturno para que o próximo lançamento deve resolver o problema
//  	$ionicViewService.clearHistory();
//         //$scope.user = AuthenticationService.getUser();
//         //console.log("HomeController");
//         $scope.welcome = "Seja Bem vindo ao Portal.";
//     }
// ]);


(function () {
    'use strict';
  angular
    .module('app')
    .controller('HomeController', HomeController);

HomeController.$inject = ['$scope','$ionicViewService'];

    /* @ngInject */
  	function HomeController ($scope,$ionicViewService) { 
        //var ctrl = this;
	        	// This a temporary solution to solve an issue where the back button is displayed when it should not be.
	 	// This is fixed in the nightly ionic build so the next release should fix the issue
	 	// Esta é uma solução temporária para resolver um problema em que o botão de volta é exibido quando não deveria ser. 
	 // Este é fixo na construção iônica noturno para que o próximo lançamento deve resolver o problema
	 	$ionicViewService.clearHistory();
        //$scope.user = AuthenticationService.getUser();
        //console.log("HomeController");
        $scope.welcome = "Seja Bem vindo ao Portal.";
    }

        


})();


(function () {
    'use strict';
  angular
    .module('app')
    .controller('MainCtrl', MainCtrl);

  MainCtrl.$inject = ['$scope','$ionicViewService'];

    /* @ngInject */
  	function MainCtrl ($scope,$ionicViewService) { 
  		$scope.mainCtrl = {};
  	  $scope.leftButtons = [{
  	    type: 'button-icon button-clear ion-navicon',
  	    tap: function(e) {
  	      $ionicSideMenuDelegate.toggleLeft($scope.$$childHead);
  	    }
  	  }];
  	  
  	  $scope.mainCtrl.showFeature = false;
    }

        


})();

