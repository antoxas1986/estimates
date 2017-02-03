(function () {
    'use strict';

    angular.module('glorem').config(customerEstimateRoute);

    customerEstimateRoute.$inject = ['$stateProvider'];

    function customerEstimateRoute($stateProvider) {
        $stateProvider.state('customerEstimate', {
            parent: 'site',
            url: '/customerEstimate/:id',
            data: {
                roles: []
            },
            templateUrl: '/resources/components/customerEstimate/customerEstimate.tpl.html',
            controller: 'CustomerEstimateController',
            controllerAs: 'vm'
        });
    }
}());