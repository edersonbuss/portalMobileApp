/*! portal-emissor-mobile v1.0.0 | (c) 2014 edersonbuss |  */
(function () {
  'use strict';
  angular
    .module('app')
    .factory('AuthenticationService', AuthenticationService);

AuthenticationService.$inject = ['Base64', '$rootScope','$window'];

/**
 * @ngInject
 */
  function AuthenticationService (Base64, $rootScope,$window) { 
       
        var serviceFactory = {};
            var _user = {
                isAuthenticated: false,
                isAdmin: false,
                userId: null,
                nome: null,
                roles: null,
                authdata:null
            };
              
            var _isLoggedIn = function () {
                return _user !== null;
            };
            
            var _isAuthenticated = function () {
                return _user.isAuthenticated;
            };

            var _authorize = function (role) {
                return !role || (
                    _user !== null &&
                    (role === true || _.contains(_user.roles, role))
                );
            };

            
            var _getUser = function () {

                return _user;
            };
            
            var _setUser = function (user) {

                _user = user;
            
            };

           
            serviceFactory.SetCredentials = function (user) {
                var authdata = Base64.encode(user.username + ':' + user.password);
     
                // $rootScope.globals = {
                //     currentUser: {
                //         username: user.username,
                //         authdata: authdata
                //     }
                // };
     
                //$http.defaults.headers.common['Authorization'] = 'Basic ' + authdata; // jshint ignore:line
                //$cookieStore.put('globals', $rootScope.globals);

                            var _user = {
                                isAuthenticated: true,
                                isAdmin: false,
                                userId: null,
                                nome: user.username,
                                roles: null,
                                authdata:authdata
                            };
                       
                            _setUser(_user);

                        
                            $window.sessionStorage.token = authdata;
                        
                       // $location.path("/home");
            };
 
            serviceFactory.ClearCredentials = function () {
                delete $rootScope.globals;
                //$cookieStore.remove('globals');
                //$http.defaults.headers.common.Authorization = 'Basic ';
            };

            serviceFactory.getUser = _getUser;
            serviceFactory.setUser = _setUser;
            serviceFactory.user = _user;
            serviceFactory.isLoggedIn = _isLoggedIn;
            serviceFactory.authorize = _authorize;
            serviceFactory.isAuthenticated = _isAuthenticated;
            return serviceFactory;
        
  }

})();


(function () {
    'use strict';
  angular
    .module('app')
    .factory('tokenInterceptorService', tokenInterceptorService);

tokenInterceptorService.$inject = ['$q', '$window', '$location', 'AuthenticationService','$rootScope','AUTH_EVENTS'];

    /* @ngInject */
  function tokenInterceptorService ($q, $window, $location, AuthenticationService,$rootScope,AUTH_EVENTS) { 
      return {
        //objeto request recebe as configurações para realizar o request, se deferido com $q.when, então ele vira uma requisição.
        request: function (config) {
            config.headers = config.headers || {};
            //if ($window.sessionStorage.token) {
                //config.headers.Authorization = 'Basic dXNlcl9pdHM6ZGVzZW52';
               
            //}
           
            return config;
        },
        requestError: function (rejection) {
            return $q.reject(rejection);
        },
        /* Set Authentication.isAuthenticated to true if 200 received */
        response: function (response) {
            if (response != null && response.status == 200 && $window.sessionStorage.token && !AuthenticationService.isAuthenticated()) {
                AuthenticationService.user.isAuthenticated = true;
            }
            return response || $q.when(response);
        },

        /* Revoke client authentication if 401 is received */
        responseError: function (rejection) {
            if (rejection != null && rejection.status === 401 && ($window.sessionStorage.token || AuthenticationService.isAuthenticated())) {
                delete $window.sessionStorage.token;
                AuthenticationService.user.isAuthenticated = false;
                //$location.path("/login");
                $rootScope.$broadcast(AUTH_EVENTS.unauthorizedResponse, rejection);
            }
            if (rejection != null && rejection.status === 419 || rejection.status === 440){
                $rootScope.$broadcast(AUTH_EVENTS.sessionTimeout, rejection);
              }


            return $q.reject(rejection);
        }


    };
   }     
  

})();


// //A aplicação AngularJS armazena o token no usuário 'sessionStorage e acrescenta um cabeçalho de autorização que contém o token em cada solicitações feitas depois disso.
// appServices.factory('tokenInterceptorService', function ($q, $window, $location, AuthenticationService,$rootScope,AUTH_EVENTS) {
//     return {
//         //objeto request recebe as configurações para realizar o request, se deferido com $q.when, então ele vira uma requisição.
//         request: function (config) {
//             config.headers = config.headers || {};
//            // if ($window.sessionStorage.token) {
//                 //config.headers.Authorization = 'Bearer ' + $window.sessionStorage.token;
               
//             //}
//             return config;
//         },
//         requestError: function (rejection) {
//             return $q.reject(rejection);
//         },
//         /* Set Authentication.isAuthenticated to true if 200 received */
//         response: function (response) {
//             if (response != null && response.status == 200 && $window.sessionStorage.token && !AuthenticationService.isAuthenticated()) {
//                 AuthenticationService.user.isAuthenticated = true;
//             }
//             return response || $q.when(response);
//         },

//         /* Revoke client authentication if 401 is received */
//         responseError: function (rejection) {
//             if (rejection != null && rejection.status === 401 && ($window.sessionStorage.token || AuthenticationService.isAuthenticated())) {
//                 delete $window.sessionStorage.token;
//                 AuthenticationService.user.isAuthenticated = false;
//                 //$location.path("/login");
//                 $rootScope.$broadcast(AUTH_EVENTS.unauthorizedResponse, rejection);
//             }
//             if (rejection != null && rejection.status === 419 || rejection.status === 440){
//                 $rootScope.$broadcast(AUTH_EVENTS.sessionTimeout, rejection);
//               }


//             return $q.reject(rejection);
//         }


//     };
// });

(function () {
  'use strict';
  angular
    .module('app')
    .factory('UserService', UserService);

    // manually declaring is time wasting
UserService.$inject = ['$http','Base64'];

/**
 * @ngInject
 */
  function UserService ($http,Base64) { 
        
        var service = {
          signIn: signIn,
          logOut: logOut,
          register: register
        };
        return service;

       

        function signIn (user) { 
            //efetuaLogin(user.username, user.password); 
            //efetivaLogin(user.username, user.password); 

            
           
        };

         

        function efetuaLogin(username, password) {
             $http({
                method: 'POST',
                url: "http://localhost:8080/portal-emissor/autoLogin",
                data: {
                    'user': username,
                    'password': password
                },
                withCredentials:true,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded;'
                } // set the headers so angular passing info as form data (not request payload)
            }).  
                success(function(data, status, headers, config) {
                 efetivaLogin(username, password);
                }).
                error(function(data, status, headers, config) {
                  // called asynchronously if an error occurs
                  // or server returns response with an error status.
                });
        };

        function efetivaLogin (username, password) {
             $http({
                                    method: 'POST',
                                    url: "http://localhost:8080/portal-emissor/j_security_check",
                                    data: {
                                            'j_username': username,
                                            'j_password': password
                                    },
                                    headers: {
                                        'Content-Type': 'application/x-www-form-urlencoded;'
                                    } // set the headers so angular passing info as form data (not request payload)
                                }).  
                                    success(function(data, status, headers, config) {
                                    
                                    }).
                                    error(function(data, status, headers, config) {
                                      // called asynchronously if an error occurs
                                      // or server returns response with an error status.
                                    });
        };

        function logOut(userId) {
            return $http.get(options.api.base_url + '/security/logout/' + userId);
            
            //return $http({
            //    method: 'GET',
            //    url: options.api.base_url + "/security/logout/" + userId,
            //    headers: {
            //        'Content-Type': 'application/json;'
            //    } // set the headers so angular passing info as form data (not request payload)
            //});
        };
        
        function register(username, password, passwordConfirmation) {
            return $http.post(options.api.base_url + '/user/register', {username: username, password: password, passwordConfirmation: passwordConfirmation });
        };
        
  }

})();


// appServices.factory('UserService', function ($http) {
//     return {


       


//     	signIn: function(user) {
    		
//     		//var user = {
//     			//	username: user.username,
//     			//	password:user.password
//     			//	};
// var efetuaLogin = function (username, password) {

//             $http({
//                 method: 'POST',
//                 url: "http://localhost:8080/portal-emissor/autoLogin?path=/login.jsp",
//                 data: {
//                     'user': username,
//                     'password': password
//                 },
//                 headers: {
//                     'Content-Type': 'application/x-www-form-urlencoded;'
//                 } // set the headers so angular passing info as form data (not request payload)
//             }).  
//                 success(function(data, status, headers, config) {
//                  efetivaLogin(username, password);
//                 }).
//                 error(function(data, status, headers, config) {
//                   // called asynchronously if an error occurs
//                   // or server returns response with an error status.
//                 });
    
//         };


//        var efetivaLogin = function (user, pass) {
//               $http({
//                                     method: 'POST',
//                                     url: "http://localhost:8080/portal-emissor/j_security_check?"+(new Date()).getTime(),
//                                     data: {
//                                             'j_username': user,
//                                             'j_password': pass
//                                     },
//                                     headers: {
//                                         'Content-Type': 'application/x-www-form-urlencoded;'
//                                     } // set the headers so angular passing info as form data (not request payload)
//                                 }).  
//                                     success(function(data, status, headers, config) {
//                                     home
//                                     }).
//                                     error(function(data, status, headers, config) {
//                                       // called asynchronously if an error occurs
//                                       // or server returns response with an error status.
//                                     });

//          };
                

//                   efetuaLogin(user.username, user.password); 




        

            
//     		//return $http.post(options.api.base_url + '/security/login',user);
        
//         },

 

      









//         logOut: function (userId) {
//         	return $http.get(options.api.base_url + '/security/logout/' + userId);
        	
//             //return $http({
//             //    method: 'GET',
//             //    url: options.api.base_url + "/security/logout/" + userId,
//             //    headers: {
//             //        'Content-Type': 'application/json;'
//             //    } // set the headers so angular passing info as form data (not request payload)
//             //});
//         },
        
//         register: function(username, password, passwordConfirmation) {
//             return $http.post(options.api.base_url + '/user/register', {username: username, password: password, passwordConfirmation: passwordConfirmation });
//         }
//     };
// });

 


// appServices.factory('ServicoService', function($http) {
//     return {
//         findAll: function(pageIndex, pageSize) {
//             return $http.get(options.api.base_url + '/servicos', { params: { page: pageIndex, pageSize: pageSize } } );
//         },

//         findById: function(id) {
//             return $http.get(options.api.base_url + '/servicos/' + id);
//         },

     
// //        delete: function(id) {
// //            return $http.delete(options.api.base_url + '/servicos/' + id);
// //        },

//         create: function(servico) {
//             return $http.post(options.api.base_url + '/servicos', {'servico': servico});
//         },

//         update: function(servico) {
//             return $http.put(options.api.base_url + '/servicos', {'servico': servico});
//         }
//     };
// });


//Em caso de qualquer chamada de API retorna 401 temos que redirecionar usuário a página de login. Interceptor HTTP
//	Neste código um pouco mais complexo, estamos criando uma funcionalidade para capturar os
//	eventos ajax do sistema e exibir mensagens de erro personalizada, caso existam. Isso é feito para
//	que não precisemos tratar erros em qualquer chamada ajax que houver
// appServices.factory('httpInterceptorService', function httpInterceptorService($q, $window, $location, $rootScope,AUTH_EVENTS) {
//     return function (promise) {
       
//         var success = function (response) {
//             return response;
//         };

//         var error = function (response) {
//             // do something on error
//             //$data = response.data;
//             //$error = $data.error;
//             //console.error($data);

//             // As APIs protegidas deve retornar um status 401 se não LoggedIn e 403 se o loggedin usuário não tem as funções apropriadas.
//             if (response.status === 401) {
//                 console.log("[INFO] 401 Unauthorized - O usuário não está logado");
//                 //SecurityService.endSession();
//                 $rootScope.$broadcast(AUTH_EVENTS.notAuthenticated, response);
//                // $location.url('/login');
//             } else if (response.status == 400) {
//                // console.log("[ERROR] Bad request response from the server.");
//                 $rootScope.$broadcast(AUTH_EVENTS.unauthorizedResponse, response);
//             } else if (response.status == 403) {
//                 //console.log("[ERROR] 403 Proibido - O usuário está conectado, mas não é permitido o acesso.");
//                 $rootScope.$broadcast(AUTH_EVENTS.notAuthorized, response);
//             } else if (response.status === 419 || response.status === 440) {
//                // console.log("[ERROR] 419 Authentication Timeout (não standard) - Sessão expirou  440 Tempo limite de login (Microsoft apenas) - Sessão expirou");
//                 $rootScope.$broadcast(AUTH_EVENTS.sessionTimeout, response);
//             } else if (response.status === 404) {
//                 alert("Erro ao acessar servidor. Página não encontrada. Veja o log de erros para maiores detalhes");
//                 $rootScope.$broadcast(AUTH_EVENTS.unauthorizedResponse, response);
//             } else if (response.status == 500) {
//                 //console.log("[ERROR] Internal server error.");
//                 $rootScope.$broadcast(AUTH_EVENTS.unauthorizedResponse, response);
//             } else {
//                 //console.log("[ERROR] Unexpected error from server.");
//                 $rootScope.$broadcast(AUTH_EVENTS.unauthorizedResponse, response);
//             }

//             return $q.reject(response);
//         };

//         return promise.then(success, error);
//     };
// });


// appServices.factory('UtilsService', function() {
//     return {
//         parseErrors: function(passedErrors) {
//             var errors = [];

//             Object.keys(passedErrors).forEach(function (field) {
//                 console.log(passedErrors[field].message);
//                 errors.push(passedErrors[field].message);
//             });

//             return errors;
//         }
//     };
// });





(function () {
    'use strict';
  angular
    .module('app')
    .factory('httpInterceptorService', httpInterceptorService);

httpInterceptorService.$inject = ['$q', '$window', '$location', '$rootScope','AUTH_EVENTS'];

    /* @ngInject */
  function httpInterceptorService ($q, $window, $location, $rootScope,AUTH_EVENTS) { 
        
        return function (promise) {
               
                var success = function (response) {
                    return response;
                };

                var error = function (response) {
                    // do something on error
                    //$data = response.data;
                    //$error = $data.error;
                    //console.error($data);

                    // As APIs protegidas deve retornar um status 401 se não LoggedIn e 403 se o loggedin usuário não tem as funções apropriadas.
                    if (response.status === 401) {
                        console.log("[INFO] 401 Unauthorized - O usuário não está logado");
                        //SecurityService.endSession();
                        $rootScope.$broadcast(AUTH_EVENTS.notAuthenticated, response);
                       // $location.url('/login');
                    } else if (response.status == 400) {
                       // console.log("[ERROR] Bad request response from the server.");
                        $rootScope.$broadcast(AUTH_EVENTS.unauthorizedResponse, response);
                    } else if (response.status == 403) {
                        //console.log("[ERROR] 403 Proibido - O usuário está conectado, mas não é permitido o acesso.");
                        $rootScope.$broadcast(AUTH_EVENTS.notAuthorized, response);
                    } else if (response.status === 419 || response.status === 440) {
                       // console.log("[ERROR] 419 Authentication Timeout (não standard) - Sessão expirou  440 Tempo limite de login (Microsoft apenas) - Sessão expirou");
                        $rootScope.$broadcast(AUTH_EVENTS.sessionTimeout, response);
                    } else if (response.status === 404) {
                        alert("Erro ao acessar servidor. Página não encontrada. Veja o log de erros para maiores detalhes");
                        $rootScope.$broadcast(AUTH_EVENTS.unauthorizedResponse, response);
                    } else if (response.status == 500) {
                        //console.log("[ERROR] Internal server error.");
                        $rootScope.$broadcast(AUTH_EVENTS.unauthorizedResponse, response);
                    } else {
                        //console.log("[ERROR] Unexpected error from server.");
                        $rootScope.$broadcast(AUTH_EVENTS.unauthorizedResponse, response);
                    }

                    return $q.reject(response);
                };

                return promise.then(success, error);
            };
        
        
  }

})();



//this is used to parse the profile
//function url_base64_decode(str) {
//  var output = str.replace('-', '+').replace('_', '/');
//  switch (output.length % 4) {
//    case 0:
//      break;
//    case 2:
//      output += '==';
//      break;
//    case 3:
//      output += '=';
//      break;
//    default:
//      throw 'Illegal base64url string!';
//  }
//  return window.atob(output); //polifyll https://github.com/davidchambers/Base64.js
//}

//Filters são usados em conjunto com arrays de dados e também saídas de loops. Se você estiver em um loop de dados e quiser filtrar coisas específicas, você está no lugar certo, você pode também usar os Filters para filtrar o que um usuário escreveu dentro de um input por exemplo.
//Finalizando, na linha 103, é criado um método chamado filter que será usado para realizar a
//paginação de alguns grids do sistema
//We already have a limitTo filter built-in to angular,
//let's make a startFrom filter
// app.filter('startFrom', function () {
//     return function (input, start) {
//         if (input == null)
//             return null;
//         start = +start; //parse to int
//         return input.slice(start);
//     }
// });





(function () {
    'use strict';
  angular
    .module('app')
    .filter('startFrom', startFrom);



    /* @ngInject */
  function startFrom () { 
        
    return function (input, start) {
        if (input == null)
            return null;
        start = +start; //parse to int
        return input.slice(start);
    }
        
        
  }

})();



(function () {
    'use strict';
  angular
    .module('app')
    .factory('Base64', Base64);



    /* @ngInject */
  function Base64 () { 
       
       var keyStr = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/='; 
    return {
        encode: function (input) {
            var output = "";
            var chr1, chr2, chr3 = "";
            var enc1, enc2, enc3, enc4 = "";
            var i = 0;
 
            do {
                chr1 = input.charCodeAt(i++);
                chr2 = input.charCodeAt(i++);
                chr3 = input.charCodeAt(i++);
 
                enc1 = chr1 >> 2;
                enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
                enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
                enc4 = chr3 & 63;
 
                if (isNaN(chr2)) {
                    enc3 = enc4 = 64;
                } else if (isNaN(chr3)) {
                    enc4 = 64;
                }
 
                output = output +
                    keyStr.charAt(enc1) +
                    keyStr.charAt(enc2) +
                    keyStr.charAt(enc3) +
                    keyStr.charAt(enc4);
                chr1 = chr2 = chr3 = "";
                enc1 = enc2 = enc3 = enc4 = "";
            } while (i < input.length);
 
            return output;
        },
 
        decode: function (input) {
            var output = "";
            var chr1, chr2, chr3 = "";
            var enc1, enc2, enc3, enc4 = "";
            var i = 0;
 
            // remove all characters that are not A-Z, a-z, 0-9, +, /, or =
            var base64test = /[^A-Za-z0-9\+\/\=]/g;
            if (base64test.exec(input)) {
                window.alert("There were invalid base64 characters in the input text.\n" +
                    "Valid base64 characters are A-Z, a-z, 0-9, '+', '/',and '='\n" +
                    "Expect errors in decoding.");
            }
            input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");
 
            do {
                enc1 = keyStr.indexOf(input.charAt(i++));
                enc2 = keyStr.indexOf(input.charAt(i++));
                enc3 = keyStr.indexOf(input.charAt(i++));
                enc4 = keyStr.indexOf(input.charAt(i++));
 
                chr1 = (enc1 << 2) | (enc2 >> 4);
                chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
                chr3 = ((enc3 & 3) << 6) | enc4;
 
                output = output + String.fromCharCode(chr1);
 
                if (enc3 != 64) {
                    output = output + String.fromCharCode(chr2);
                }
                if (enc4 != 64) {
                    output = output + String.fromCharCode(chr3);
                }
 
                chr1 = chr2 = chr3 = "";
                enc1 = enc2 = enc3 = enc4 = "";
 
            } while (i < input.length);
 
            return output;
        }
        
        
  }
}

})();




