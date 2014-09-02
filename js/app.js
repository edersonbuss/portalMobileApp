(function() {
    'use strict';
    angular
        .module('app', [
            'ionic',
            'ui.router',
            'ngResource'
        ])

    .constant('AUTH_EVENTS', {
        loginSuccess: 'auth-login-success',
        loginFailed: 'auth-login-failed',
        logoutSuccess: 'auth-logout-success',
        sessionTimeout: 'auth-session-timeout',
        notAuthenticated: 'auth-not-authenticated',
        notAuthorized: 'auth-not-authorized'
    })

    .config(function($stateProvider, $urlRouterProvider, $httpProvider) {

        //Remove the header used to identify ajax call  that would prevent CORS from working
        //$httpProvider.defaults.useXDomain = true;
        //$httpProvider.defaults.headers.common = 'Content-Type: application/json';

        //Remova o cabeçalho contendo XMLHttpRequest usado para identificar chamada ajax 
        // que impediria CORS de trabalha
        delete $httpProvider.defaults.headers.common['X-Requested-With'];

        // $httpProvider.defaults.headers.common['Authorization'] = 'Basic ' + authdata;
        //$http.defaults.headers.common['Authorization'] = 'Basic ' + Base64.encode($scope.login.login + ':' + $scope.login.password);

        //$httpProvider.defaults.headers.common['Access-Control-Request-Method'] = 'GET, POST, PUT';//O método HTTP da solicitação real. Este cabeçalho do pedido é sempre incluído, mesmo que o método HTTP é um método HTTP simples como definido anteriormente (GET, POST, HEAD).
        //$httpProvider.defaults.headers.common['Access-Control-Request-Headers'] = 'X-Custom-Header,accept, origin, authorization';//Uma lista de cabeçalhos de não-simples que estão incluídos no pedido separado por vírgulas.
        //$httpProvider.defaults.headers.common['Access-Control-Max-Age'] = '1728000';


        //$httpProvider.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
        //$httpProvider.defaults.headers.common['Access-Control-Allow-Methods'] = 'GET, POST, PUT,OPTIONS';//obrigatório se o pedido tem um Access-Control-Request-Headers cabeçalho
        //$httpProvider.defaults.headers.common['Access-Control-Allow-Headers'] = '*,X-Custom-Header,authorization, Content-Type, Depth, User-Agent, X-File-Size, X-Requested-With, If-Modified-Since, X-File-Name, Cache-Control, Origin, Accept,Accept-Language,Pragma';
        //$httpProvider.defaults.headers.common['Access-Control-Allow-Headers'] = 'Accept';
        $httpProvider.defaults.useXDomain = true;

        //$httpProvider.defaults.headers.common['Authorization']= 'Basic 1';
        //$httpProvider.defaults.headers.common.Authorization = 'Basic dXNlcl9pbnRlZ3JhY2FvX3ZvbHBhdG86ZGVzZW52';
        //Adicionar o interceptor para os $httpProvider.
        //redirecionar somente se ambos isAuthenticated é falsa e nenhum sinal está definido
        $httpProvider.interceptors.push('tokenInterceptorService');

        //configura o RESPONSE interceptor, usado para exibir o ícone de acesso ao servidor
        // e a exibir uma mensagem de erro caso o servidor retorne algum erro
        $httpProvider.responseInterceptors.push('httpInterceptorService');

        //Dessa forma, todas as chamadas para $ http.post transformará automaticamente o corpo para o mesmo formato utilizado pelo param jQuery $. pós chamada.
        //$httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8';
        //    $httpProvider.defaults.transformRequest = function(data){
        //        if (data === undefined) {
        //            return data;
        //        }
        //        return $.param(data);
        //    };

        //$httpProvider.defaults.headers.common = {};    
        // console.log('logging out headers');     
        // console.log($httpProvider.defaults);   
        // console.log($httpProvider.defaults.headers.common);  
        // console.log($httpProvider.defaults.headers.post);  
        // console.log($httpProvider.defaults.headers.put); 
        // console.log($httpProvider.defaults.headers.patch); 
        // console.log('end logging out headers');  
        // $httpProvider.defaults.headers.common = {Accept: "application/json, text/plain, */*"};  
        // $httpProvider.defaults.headers.post = {"Content-Type": "application/json;charset=utf-8"}; 
        // console.log('after: logging out headers');  
        // console.log($httpProvider.defaults.headers.common);  
        // console.log($httpProvider.defaults.headers.post);  
        // console.log($httpProvider.defaults.headers.put);  
        // console.log($httpProvider.defaults.headers.patch); 
        // console.log('after: finish logging out headers');  

    })




    //
    //.run(function($ionicPlatform) {
    //  $ionicPlatform.ready(function() {
    //    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    //    // for form inputs)
    //    if(window.cordova && window.cordova.plugins.Keyboard) {
    //      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    //    }
    //    if(window.StatusBar) {
    //      // org.apache.cordova.statusbar required
    //      StatusBar.styleDefault();
    //    }
    //  });
    //})




    .run(function($rootScope, $state, $stateParams, $location, $window, AuthenticationService, AUTH_EVENTS, $ionicPlatform) {


        $rootScope.$state = $state;
        $rootScope.$stateParams = $stateParams;
        $state.go('auth.login');

        $ionicPlatform.ready(function() {
            // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
            // for form inputs)
          // Ocultar a barra de acessório por padrão (remover este para mostrar a barra de acessórios acima do teclado
          // Para entradas de formulário)
            if (window.cordova && window.cordova.plugins.Keyboard) {
                cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
            }
            //método run, vamos fazer algumas coisas global como a gestão da barra de status
            if (window.StatusBar) {
                // org.apache.cordova.statusbar required
                StatusBar.styleDefault();
            }
        });

        //$rootScope.globals = $cookieStore.get('globals') || {};
        //    if ($rootScope.globals.currentUser) {
        //       $httpProvider.defaults.headers.common['Authorization'] = 'Basic ' + $rootScope.globals.currentUser.authdata; // jshint ignore:line
        //}


        //em cada mudança de rota no evento de $routeChangeStart verfica se tem acesso a rota, redirecionar para o login ou para não autorizado
        $rootScope.$on("$stateChangeStart", function(event, toState, toParams, fromState, fromParams) {

            //redirect only if both isAuthenticated is false and no token is set
            if (toState != null && toState.data != null && toState.data.requiredAuthentication && !AuthenticationService.isAuthenticated() && !$window.sessionStorage.token) {
                //if (toState != null && toState.data != null && toState.data.requiredAuthentication && !$rootScope.globals.currentUser) {
                $rootScope.$broadcast(AUTH_EVENTS.notAuthenticated);
                event.preventDefault(); //para evitar que a transição aconteça.
                $state.go('auth.login');

                //$location.path("/login");
            }
        });

        $rootScope.$on('$locationChangeSuccess', function(evt) {
            //console.log('$locationChangeSuccess');
        });

        $rootScope.$on('$stateChangeError', function(event, toState, toParams, fromState, fromParams) {
            //console.log('$stateChangeError');
            // $state.go('404');
        });

        $rootScope.$on('$stateNotFound',
            function(event, unfoundState, fromState, fromParams) {
                //  console.log(unfoundState.to); // "lazy.state"
                //  console.log(unfoundState.toParams); // {a:1, b:2}
                //  console.log(unfoundState.options); // {inherit:false} + default options
            });
        //    $scope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams){
        //        if (angular.isDefined(toState.data.pageTitle) ) {
        //          $scope.pageTitle = toState.data.pageTitle + ' | ngBoilerplate' ;
        //        }
        //      });


        $rootScope.$on(AUTH_EVENTS.loginSuccess, function() {
            //console.log('AUTH_EVENTS.loginSuccess');
            //$location.path("/home");
            $state.go('app.home');

        });
        $rootScope.$on(AUTH_EVENTS.loginFailure, function() {
            //console.log('AUTH_EVENTS.loginFailure');
            //$location.path("'login'");
            $state.go('auth.login');
        });
        $rootScope.$on(AUTH_EVENTS.logoutSuccess, function() {
            //console.log('AUTH_EVENTS.logoutSuccess');
            //$location.path("/login");
            $state.go('auth.login');
        });

        $rootScope.$on(AUTH_EVENTS.notAuthenticated, function() {
            //console.log('AUTH_EVENTS.notAuthenticated');
            //$location.path("/login");
            $state.go('auth.login');
        });

        $rootScope.$on(AUTH_EVENTS.forbidden, function(event, response) {
            // console.log('AUTH_EVENTS.forbidden');
            //$location.path('/login');
            $state.go('auth.login');
        });




    });



    //fim
})();