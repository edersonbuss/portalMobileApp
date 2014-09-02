(function() {
    'use strict';
    angular
        .module('app')
        .controller('LoginController', LoginController);

    LoginController.$inject = ['$scope', '$rootScope', '$q', '$location', '$window', 'AuthenticationService', 'AUTH_EVENTS'];

    /* @ngInject */
    function LoginController($scope, $rootScope, $q, $location, $window, AuthenticationService, AUTH_EVENTS) {
        //var ctrl = this;
        // reset login status
        AuthenticationService.ClearCredentials();

        $scope.login = function login(user) {
            $scope.show();
            if (user.username !== undefined && user.password !== undefined) {
                AuthenticationService.SetCredentials(user);
                AuthenticationService.Login(user).then(function(data) {
                    $rootScope.$broadcast(AUTH_EVENTS.loginSuccess);
                    $scope.hide();
                });
            }
        };
    }
})();

(function() {
    'use strict';
    angular
        .module('app')
        .controller('LogoutController', LogoutController);

    LogoutController.$inject = ['$scope', '$rootScope', '$q', '$location', '$window', 'AuthenticationService', 'AUTH_EVENTS'];

    /* @ngInject */
    function LogoutController($scope, $rootScope, $q, $location, $window, AuthenticationService, AUTH_EVENTS) {
        //var ctrl = this;
        AuthenticationService.ClearCredentials();
        $rootScope.$broadcast(AUTH_EVENTS.logoutSuccess);
    }
})();

