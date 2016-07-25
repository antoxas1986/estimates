(function () {
    'use strict';

    angular
        .module('glorem')
        .config(loginRoute);

    loginRoute.$inject = ['$stateProvider', '$urlRouterProvider'];

    function loginRoute($stateProvider, $urlRouterProvider) {

        $urlRouterProvider.otherwise('/');

        $stateProvider.state('site', {
            'abstract': true,
            resolve: {
                authorize: ['authorization',
                    function (authorization) {
                        return authorization.authorize();
                    }
                ]
            },
            template: '<ui-view />'
        });
        
        $stateProvider.state('/', {
            url: '/',
            data: {
                roles: []
            },
            templateUrl: '/resources/components/login/login.tpl.html',
            controller: 'LoginController',
            controllerAs: 'vm'
        });
        
        $stateProvider.state('accessdenied', {
            url: '/accessdenied',
            data: {
                roles: []
            },
            templateUrl: '/resources/components/error/403.tpl.html',
            controller: 'LoginController',
            controllerAs: 'vm'
        });
        
        
    }
} ());