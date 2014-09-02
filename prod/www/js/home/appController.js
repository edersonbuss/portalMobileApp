(function() {
    'use strict';
    angular
        .module('app')
        .controller('AppController', AppController);


    //AppController.$inject = ['$scope','$ionicModal', '$timeout'];
    AppController.$inject = ['$scope', '$ionicSideMenuDelegate','$ionicLoading'];

    function AppController($scope, $ionicSideMenuDelegate,$ionicLoading) {
        $scope.toggleLeft = function() {
            $ionicSideMenuDelegate.toggleLeft();
        };

        $scope.show = function() {
            $ionicLoading.show({
              template: 'Loading...'
            });
          };
        $scope.hide = function(){
         $ionicLoading.hide();
        };


          $scope.data = {
            isLoading: false
          };

        // Form data for the login modal
        // $scope.loginData = {};

        // Create the login modal that we will use later
        //	  $ionicModal.fromTemplateUrl('templates/login.html', {
        //	    scope: $scope
        //	  }).then(function(modal) {
        //	    $scope.modal = modal;
        //	  });

        //	  // Triggered in the login modal to close it
        //	  $scope.closeLogin = function() {
        //	    $scope.modal.hide();
        //	  };
        //
        //	  // Open the login modal
        //	  $scope.login = function() {
        //	    $scope.modal.show();
        //	  };
        //
        //	  // Perform the login action when the user submits the login form
        //	  $scope.doLogin = function() {
        //	    console.log('Doing login', $scope.loginData);
        //
        //	    // Simulate a login delay. Remove this and replace with your login
        //	    // code if using a login system
        //	    $timeout(function() {
        //	      $scope.closeLogin();
        //	    }, 1000);
        //	  };

    }

})();


//.controller('MainCtrl', function($scope, $ionicSideMenuDelegate) {
//	  
//	  $scope.mainCtrl = {};
//	  $scope.leftButtons = [{
//	    type: 'button-icon button-clear ion-navicon',
//	    tap: function(e) {
//	      $ionicSideMenuDelegate.toggleLeft($scope.$$childHead);
//	    }
//	  }];
//	  
//	  $scope.mainCtrl.showFeature = false;
//	  
//	});


