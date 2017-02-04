(function () {
    'use strict';

    angular.module('glorem').config(createEstimateRoute);

    createEstimateRoute.$inject = ['$stateProvider'];

    function createEstimateRoute($stateProvider) {
        $stateProvider.state('templates', {
            parent: 'site',
            url: '/templates',
            data: {
                roles: ['ROLE_ADMIN']
            },
            templateUrl: '/resources/components/templates/templates.tpl.html',
            controller: 'TemplatesController',
            controllerAs: 'vm'
        });
    }
} ());