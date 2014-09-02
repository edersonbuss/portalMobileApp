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

        $scope.user = {
            username: "",
            password: ""
        };

        $scope.login = function login(user) {

                $scope.show('Please wait.. Authenticating');
                var username = this.user.username;
                var password = this.user.password;
                if(!username || !password) {
                    $scope.notify("Credencias invalidas");
                    return false;
                }
                  
                AuthenticationService.SetCredentials(user);
                AuthenticationService.Login(user).then(function(data) {
                    $rootScope.$broadcast(AUTH_EVENTS.loginSuccess);
                    $scope.hide();
                });
            
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

(function() {
    'use strict';
    angular
        .module('app')
        .controller('SignUpCtrl', SignUpCtrl);

    SignUpCtrl.$inject = ['$scope', '$rootScope', '$q', '$location', '$window', 'AuthenticationService', 'AUTH_EVENTS'];

    /* @ngInject */
    function SignUpCtrl($scope, $rootScope, $q, $location, $window, AuthenticationService, AUTH_EVENTS) {
        $scope.user = {
        email: "",
        password: "",
        name: ""
      };

        $scope.createUser = function () {
            var email = this.user.email;
            var password = this.user.password;
            var uName = this.user.name;
            if(!email || !password || !uName) {
                $scope.notify("Please enter valid data");
                return false;
            }
            $scope.show('Please wait.. Registering');
            API.signup({
                email: email,
                password: password,
                name: uName
            }).success(function (data) {
                $scope.setToken(email); // create a session kind of thing on the client side
                $scope.hide();
                $window.location.href = ('#/bucket/list');
            }).error(function (error) {
                $scope.hide();
                if(error.error && error.error.code == 11000)
                {
                    $rootScope.notify("A user with this email already exists");
                }
                else
                {
                    $rootScope.notify("Oops something went wrong, Please try again!");
                }
            
        });
    }
}
})();

