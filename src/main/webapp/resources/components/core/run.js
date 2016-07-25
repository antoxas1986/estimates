(function () {
    angular
        .module('glorem')
        .run(runApp);

    runApp.$inject = ['$rootScope', '$state', '$stateParams', 'authorization', 'principal','helpers'];

    function runApp($rootScope, $state, $stateParams, authorization, principal, helpers) {
        $rootScope.$on('$stateChangeStart', function (event, toState, toStateParams) {
            $rootScope.toState = toState;
            $rootScope.toStateParams = toStateParams;

            if (principal.isIdentityResolved()) authorization.authorize();
        });

        $rootScope.helpers = helpers;
    }
} ());