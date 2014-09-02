/*! portal-emissor-mobile v1.0.0 | (c) 2014 edersonbuss |  */
(function () {
    'use strict';
  angular
    .module('app')
    .controller('AuthenticationController', AuthenticationController);

AuthenticationController.$inject = ['$scope','$rootScope','$q', '$location', '$window', 'UserService', 'AuthenticationService','AUTH_EVENTS'];

    
  function AuthenticationController ($scope,$rootScope,$q, $location, $window, UserService, AuthenticationService,AUTH_EVENTS) { 
    $scope.teste = " AuthenticationController teset";
        //var ctrl = this;
        //ctrl.teste1 = "3333";
      
        //$scope.logOut = logOut;
        //$scope.register = register;
        $scope.user = {};
        $scope.user = AuthenticationService.getUser();

        $scope.signIn = function signIn(user) {
     
           var deferred = $q.defer();
            if (user.username != null && user.password != null) {

                UserService.signIn(user).
                    success(function(data) {
                        AuthenticationService.SetCredentials(user.username, user.password);

                        
                        //$rootScope.$broadcast('handleBroadcast', 'teste');
                        //AuthenticationService.setUser(_user);
                        //$scope.user = AuthenticationService.getUser();
                        //$window.sessionStorage.token = data.token;
                        $rootScope.$broadcast(AUTH_EVENTS.loginSuccess);
                        deferred.resolve(data);
                       // $location.path("/home");
                     })
                     .error(function(status, data) {
                        // Apague o token, se o usuário não entrar
                       // delete $window.sessionStorage.token;
                        var _user = {
                                isAuthenticated: false,
                                isAdmin: false,
                                userId: null,
                                nome: null,
                                roles: null
                            };
                       
                        AuthenticationService.setUser(_user);
                        $scope.user = null;
                        //console.log(status);
                       // console.log(data);
                        $rootScope.$broadcast(AUTH_EVENTS.loginFailed);
                        deferred.reject(data);
                       // $scope.errors = UtilsService.parseErrors(data.errors);
                    });
            }
        }

        $scope.logOut = function logOut() {
           var deferred = $q.defer();
            if (AuthenticationService.isAuthenticated()) {
                $scope.user = AuthenticationService.getUser();
                UserService.logOut($scope.user.userId).success(function (data) {
                     var _user = {
                             isAuthenticated: false,
                             isAdmin: false,
                             userId: null,
                             nome: null,
                             roles: null
                         };
                    AuthenticationService.setUser(_user);
                    $scope.user = null;
                    delete $window.sessionStorage.token;
                    $rootScope.$broadcast(AUTH_EVENTS.logoutSuccess);
                    deferred.reject(data);
                }).error(function (status, data) {
                   // console.log(status);
                   // console.log(data);
                    deferred.reject(data);
                   // $scope.errors = UtilsService.parseErrors(data.errors);
                });
            } else {
                 $rootScope.$broadcast(AUTH_EVENTS.logoutSuccess);
            }
        }

       $scope.register = function register(username, password, passwordConfirm) {
            if (AuthenticationService.isAuthenticated()) {
                    $location.path("/login");
                }
                else {
                    UserService.register(username, password, passwordConfirm).success(function(data) {
                        $location.path("/admin/login");
                    }).error(function(status, data) {
                        console.log(status);
                        console.log(data);
                        $scope.errors = UtilsService.parseErrors(data.errors);
                    });
                }
          
        }

        
  }

})();




// 'use strict';
// appControllers.controller('AuthenticationController', ['$scope','$rootScope','$q', '$location', '$window', 'UserService', 'AuthenticationService','AUTH_EVENTS',
//     function AuthenticationController($scope,$rootScope,$q, $location, $window, UserService, AuthenticationService,AUTH_EVENTS) {

// 	$scope.user ={};
//         //sempre que é mudaddo a rolta o controler é zerado as variaveis por isso tem que colcar as propiedades no service e depois popular denovo para o controler para o scopo
//         $scope.user = AuthenticationService.getUser();
    

//         //Note que estamos passando as credenciais como um argumento em vez de depender $ scope.credentials, isso faz com que a função mais fácil
//         //de teste de unidade e evita o acoplamento entre a função e é em torno de escopo.
//         $scope.signIn = function signIn(user) {
//         	 var deferred = $q.defer();
//             if (user.username != null && user.password != null) {

//             	UserService.signIn(user).
// 	            	success(function(data) {
// 	                    var _user = {
// 	                        isAuthenticated: true,
// 	                        isAdmin: false,
// 	                        userId: data.id,
// 	                        nome: data.nome,
// 	                        roles: 'admin'
// 	                    };
// 	                    //$rootScope.$broadcast('handleBroadcast', 'teste');
// 	                    AuthenticationService.setUser(_user);
// 	                    $scope.user = AuthenticationService.getUser();
// 	                    $window.sessionStorage.token = data.token;
// 	                    $rootScope.$broadcast(AUTH_EVENTS.loginSuccess);
// 	                    deferred.resolve(data);
// 	                   // $location.path("/home");
// 	            	 })
// 	            	 .error(function(status, data) {
// 	                    // Apague o token, se o usuário não entrar
// 	                    delete $window.sessionStorage.token;
// 	                    var _user = {
// 	                            isAuthenticated: false,
// 	                            isAdmin: false,
// 	                            userId: null,
// 	                            nome: null,
// 	                            roles: null
// 	                        };
	                   
// 	                    AuthenticationService.setUser(_user);
// 	                    $scope.user = null;
// 	                    //console.log(status);
// 	                   // console.log(data);
// 	                    $rootScope.$broadcast(AUTH_EVENTS.loginFailed);
// 	                    deferred.reject(data);
// 	                   // $scope.errors = UtilsService.parseErrors(data.errors);
// 	                });
//             }
//         };


//         $scope.logOut = function logOut() {
//         	 var deferred = $q.defer();
//             if (AuthenticationService.isAuthenticated()) {
//             	$scope.user = AuthenticationService.getUser();
//                 UserService.logOut($scope.user.userId).success(function (data) {
//                 	 var _user = {
//                              isAuthenticated: false,
//                              isAdmin: false,
//                              userId: null,
//                              nome: null,
//                              roles: null
//                          };
//                     AuthenticationService.setUser(_user);
//                     $scope.user = null;
//                     delete $window.sessionStorage.token;
//                     $rootScope.$broadcast(AUTH_EVENTS.logoutSuccess);
//                     deferred.reject(data);
//                 }).error(function (status, data) {
//                    // console.log(status);
//                    // console.log(data);
//                     deferred.reject(data);
//                    // $scope.errors = UtilsService.parseErrors(data.errors);
//                 });
//             } else {
//             	 $rootScope.$broadcast(AUTH_EVENTS.logoutSuccess);
//             }
//         };
        
//         $scope.register = function register(username, password, passwordConfirm) {
//             if (AuthenticationService.isAuthenticated()) {
//                 $location.path("/login");
//             }
//             else {
//                 UserService.register(username, password, passwordConfirm).success(function(data) {
//                     $location.path("/admin/login");
//                 }).error(function(status, data) {
//                     console.log(status);
//                     console.log(data);
//                     $scope.errors = UtilsService.parseErrors(data.errors);
//                 });
//             }
//         };
        
        

//     }
// ]);


(function () {
    'use strict';
  angular
    .module('app')
    .controller('LoginController', LoginController);

LoginController.$inject = ['$scope','$rootScope','$q', '$location', '$window', 'AuthenticationService','AUTH_EVENTS'];

    /* @ngInject */
  function LoginController ($scope,$rootScope,$q, $location, $window, AuthenticationService,AUTH_EVENTS) { 
        //var ctrl = this;
       AuthenticationService.ClearCredentials();
        $scope.login = function login(user) {
        
           
                AuthenticationService.SetCredentials(user);
                //$window.sessionStorage.token = data.token;
                $rootScope.$broadcast(AUTH_EVENTS.loginSuccess);
                
                
        };
        
  }

})();

(function () {
    'use strict';
  angular
    .module('app')
    .controller('LogoutController', LogoutController);

LogoutController.$inject = ['$scope','$rootScope','$q', '$location', '$window', 'UserService', 'AuthenticationService','AUTH_EVENTS'];

    /* @ngInject */
  function LogoutController ($scope,$rootScope,$q, $location, $window, UserService, AuthenticationService,AUTH_EVENTS) { 
        //var ctrl = this;
       
        var deferred = $q.defer();
        if (AuthenticationService.isAuthenticated()) {
            $scope.user = AuthenticationService.getUser();
            UserService.logOut($scope.user.userId).success(function (data) {
                 var _user = {
                         isAuthenticated: false,
                         isAdmin: false,
                         userId: null,
                         nome: null,
                         roles: null
                     };
                AuthenticationService.setUser(_user);
                $scope.user = null;
                delete $window.sessionStorage.token;
                $rootScope.$broadcast(AUTH_EVENTS.logoutSuccess);
                deferred.reject(data);
            }).error(function (status, data) {
                //console.log(status);
                //console.log(data);
                deferred.reject(data);
               // $scope.errors = UtilsService.parseErrors(data.errors);
            });
        } else {
             $rootScope.$broadcast(AUTH_EVENTS.logoutSuccess);
        }

        
  }

})();


// appControllers.controller('LogoutController', ['$scope','$rootScope','$q', '$location', '$window', 'UserService', 'AuthenticationService','AUTH_EVENTS',
//     function LogoutController($scope,$rootScope,$q, $location, $window, UserService, AuthenticationService,AUTH_EVENTS) {
        
 
       
//                      var deferred = $q.defer();
//                     if (AuthenticationService.isAuthenticated()) {
//                         $scope.user = AuthenticationService.getUser();
//                         UserService.logOut($scope.user.userId).success(function (data) {
//                              var _user = {
//                                      isAuthenticated: false,
//                                      isAdmin: false,
//                                      userId: null,
//                                      nome: null,
//                                      roles: null
//                                  };
//                             AuthenticationService.setUser(_user);
//                             $scope.user = null;
//                             delete $window.sessionStorage.token;
//                             $rootScope.$broadcast(AUTH_EVENTS.logoutSuccess);
//                             deferred.reject(data);
//                         }).error(function (status, data) {
//                             //console.log(status);
//                             //console.log(data);
//                             deferred.reject(data);
//                            // $scope.errors = UtilsService.parseErrors(data.errors);
//                         });
//                     } else {
//                          $rootScope.$broadcast(AUTH_EVENTS.logoutSuccess);
//                     }
                
//          }
// ]);
