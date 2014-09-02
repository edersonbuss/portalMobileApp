(function() {
    'use strict';
    angular
        .module('app')
        .factory('AuthenticationService', AuthenticationService);

    AuthenticationService.$inject = ['Base64', '$rootScope', '$window', '$injector', '$q'];

    /**
     * @ngInject
     */
    function AuthenticationService(Base64, $rootScope, $window, $injector, $q) {

        var serviceFactory = {};
        var _user = {
            isAuthenticated: false,
            username: null,
            password: null,
            roles: null,
            authdata: null,
            idOrganizacao: null,
            nome: null,
            cpf: null
        };

        var _isLoggedIn = function() {
            return _user !== null;
        };

        var _isAuthenticated = function() {
            return _user.isAuthenticated;
        };

        var _authorize = function(role) {
            return !role || (
                _user !== null &&
                (role === true || _.contains(_user.roles, role))
            );
        };
        var _getUser = function() {

            return _user;
        };

        var _setUser = function(user) {

            _user = user;

        };

        var _resetUser = function() {
            var _user = {
                isAuthenticated: false,
                username: null,
                password: null,
                roles: null,
                authdata: null,
                idOrganizacao: null,
                nome: null,
                cpf: null
            };
            _setUser(_user);

        };
        serviceFactory.Login = function(user) {
            var deferred = $q.defer();
            var $http = $injector.get('$http');
            var api_base_url = "http://172.29.24.26:8080/portal-emissor/rest";
            $http.get(api_base_url + '/autorizacao_pos_virtual/autenticacao', {})
                .success(function(data) {
                    var _user = {
                        isAuthenticated: true,
                        username: user.username,
                        password: user.password,
                        roles: null,
                        authdata: data.authdata,
                        idOrganizacao: null,
                        nome: data.nome,
                        cpf: data.cpf
                    };
                    _setUser(_user);
                    deferred.resolve(data);
                })
                .error(function(data, status) {
                    deferred.reject(data);
                });
            return deferred.promise;
        };


        serviceFactory.SetCredentials = function(user) {
            var $http = $injector.get('$http');
            var authdata = Base64.encode(user.username + ':' + user.password);

            $http.defaults.headers.common['Authorization'] = 'Basic ' + authdata;
            $window.sessionStorage.token = authdata;
        };

        serviceFactory.ClearCredentials = function() {
            var $http = $injector.get('$http');
            $http.defaults.headers.common.Authorization = 'Basic ';
            delete $window.sessionStorage.token;
            _resetUser();
        };

        serviceFactory.getUser = _getUser;
        serviceFactory.setUser = _setUser;
        serviceFactory.resetUser = _resetUser;
        serviceFactory.user = _user;
        serviceFactory.isLoggedIn = _isLoggedIn;
        serviceFactory.authorize = _authorize;
        serviceFactory.isAuthenticated = _isAuthenticated;
        return serviceFactory;

    }

})();

