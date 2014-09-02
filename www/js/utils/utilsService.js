(function() {
    'use strict';
    angular
        .module('app')
        .factory('utilsService', utilsService);

    /* @ngInject */
    function utilsService() {

        return {
            // Util for finding an object by its 'id' property among an array
            findById: function findById(a, oid) {
                for (var i = 0; i < a.length; i++) {
                    if (a[i].oid == oid) return a[i];
                }
                return null;
            }

        };

    }

})();



// .controller(IndexCtrl', function($scope, LoaderService) {

//         // Show loader from service
//     LoaderService.show();

//         // add action here...

//        // Hide overlay when done
//        LoaderService.hide();
// }


(function() {
    'use strict';
    angular
        .module('app')
        .factory('LoaderService', LoaderService);

    LoaderService.$inject = ['$rootScope', '$ionicLoading'];

    /* @ngInject */
    function LoaderService($rootScope, $ionicLoading) {

        // Trigger the loading indicator
        return {
            show: function() { //code from the ionic framework doc

                // Show the loading overlay and text
                $rootScope.loading = $ionicLoading.show({

                    // The text to display in the loading indicator
                    content: 'Loading',

                    // The animation to use
                    animation: 'fade-in',

                    // Will a dark overlay or backdrop cover the entire view
                    showBackdrop: true,

                    // The maximum width of the loading indicator
                    // Text will be wrapped if longer than maxWidth
                    maxWidth: 200,

                    // The delay in showing the indicator
                    showDelay: 500
                });
            },
            hide: function() {
                $rootScope.loading.hide();
            }
        }


    };




})();





(function() {
    'use strict';
    angular
        .module('app')
        .filter('startFrom', startFrom);



    /* @ngInject */
    function startFrom() {

        return function(input, start) {
            if (input == null)
                return null;
            start = +start; //parse to int
            return input.slice(start);
        }


    }

})();



(function() {
    'use strict';
    angular
        .module('app')
        .factory('Base64', Base64);



    /* @ngInject */
    function Base64() {

        var keyStr = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
        return {
            encode: function(input) {
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

            decode: function(input) {
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





(function() {
    'use strict';
    angular
        .module('app')
        .factory('httpInterceptorService', httpInterceptorService);

    httpInterceptorService.$inject = ['$q', '$window', '$location', '$rootScope', 'AUTH_EVENTS'];

    /* @ngInject */
    function httpInterceptorService($q, $window, $location, $rootScope, AUTH_EVENTS) {

        return function(promise) {

            var success = function(response) {
                return response;
            };

            var error = function(response) {
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
                    // $rootScope.$broadcast(AUTH_EVENTS.unauthorizedResponse, response);
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





(function() {
    'use strict';
    angular
        .module('app')
        .factory('tokenInterceptorService', tokenInterceptorService);

    tokenInterceptorService.$inject = ['$q', '$window', '$location', 'AuthenticationService', '$rootScope', 'AUTH_EVENTS'];

    /* @ngInject */
    function tokenInterceptorService($q, $window, $location, AuthenticationService, $rootScope, AUTH_EVENTS) {
        return {
            //objeto request recebe as configurações para realizar o request, se deferido com $q.when, então ele vira uma requisição.
            request: function(config) {
                config.headers = config.headers || {};
                if ($window.sessionStorage.token) {
                    config.headers.Authorization = 'Basic ' + $window.sessionStorage.token;

                }

                return config;
            },
            requestError: function(rejection) {
                return $q.reject(rejection);
            },
            /* Set Authentication.isAuthenticated to true if 200 received */
            response: function(response) {
                if (response != null && response.status == 200 && $window.sessionStorage.token && !AuthenticationService.isAuthenticated()) {
                    AuthenticationService.user.isAuthenticated = true;
                }
                return response || $q.when(response);
            },

            /* Revoke client authentication if 401 is received */
            responseError: function(rejection) {
                if (rejection != null && rejection.status === 401 && ($window.sessionStorage.token || AuthenticationService.isAuthenticated())) {
                    delete $window.sessionStorage.token;
                    AuthenticationService.user.isAuthenticated = false;
                    //$location.path("/login");
                    $rootScope.$broadcast(AUTH_EVENTS.unauthorizedResponse, rejection);
                }
                if (rejection != null && rejection.status === 419 || rejection.status === 440) {
                    $rootScope.$broadcast(AUTH_EVENTS.sessionTimeout, rejection);
                }
                return $q.reject(rejection);
            }


        };
    }


})();



