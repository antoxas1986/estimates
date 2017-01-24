(function () {
    'use strict';

    angular.module('glorem').config(editEstimateRoute);

    editEstimateRoute.$inject = ['$stateProvider'];

    function editEstimateRoute($stateProvider) {
        $stateProvider.state('editEstimate', {
            parent: 'site',
            url: '/editEstimate/:id',
            data: {
                roles: ['ROLE_ADMIN']
            },
            templateUrl: '/resources/components/editEstimate/editEstimate.tpl.html',
            controller: 'EditEstimateController',
            controllerAs: 'vm'
        });
    }
}());