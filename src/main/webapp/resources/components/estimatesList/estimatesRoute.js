(function () {
    'use strict';

    angular.module('glorem').config(estimatesRoute);

    estimatesRoute.$inject = ['$stateProvider'];

    function estimatesRoute($stateProvider) {
        $stateProvider.state('estimates', {
            parent: 'site',
            url: '/estimates',
            data: {
                roles: ['ROLE_ADMIN']
            },
            templateUrl: '/resources/components/estimatesList/estimatesList.tpl.html',
            controller: 'EstimatesListController',
            controllerAs: 'vm'
        });
    }
} ());