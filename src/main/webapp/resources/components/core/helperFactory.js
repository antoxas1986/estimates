(function () {
    angular
        .module('glorem')
        .factory('helpers', helpers);

    helpers.$inject = ['$state', '$http', 'principal'];

    function helpers($state, $http, principal) {
        return {
            singout: function () {
                $http.post('/logout');
                principal.authenticate(null);
                $state.go('/');
            }
        };
    }
} ());