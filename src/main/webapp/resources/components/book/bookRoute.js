(function () {
    'use strict';

    angular.module('glorem').config(estimatesRoute);

    estimatesRoute.$inject = ['$stateProvider'];

    function estimatesRoute($stateProvider) {
        $stateProvider.state('book', {
            parent: 'site',
            url: '/book',
            data: {
                roles: ['ROLE_ADMIN']
            },
            templateUrl: '/resources/components/book/book.tpl.html',
            controller: 'BookController',
            controllerAs: 'vm'
        });
    }
} ());