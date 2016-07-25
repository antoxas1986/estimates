(function () {
    'use strict';

    angular.module('glorem').config(createEstimateRoute);

    createEstimateRoute.$inject = ['$stateProvider'];

    function createEstimateRoute($stateProvider) {
        $stateProvider.state('createEstimate', {
            parent: 'site',
            url: '/createEstimate',
            data: {
                roles: ['ROLE_ADMIN']
            },
            templateUrl: 'resources/components/createEstimate/createEstimate.tpl.html',
            controller: 'CreateEstimateController',
            controllerAs: "CEC"
        });
    }
} ());