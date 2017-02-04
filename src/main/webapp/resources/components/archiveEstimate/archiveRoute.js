(function () {
    'use strict';

    angular.module('glorem').config(archiveRoute);

    archiveRoute.$inject = ['$stateProvider'];

    function archiveRoute($stateProvider) {
        $stateProvider.state('archiveEstimate', {
            parent: 'site',
            url: '/archiveEstimate',
            data: {
                roles: ['ROLE_ADMIN']
            },
            templateUrl: '/resources/components/archiveEstimate/archiveEstimate.tpl.html',
            controller: 'ArchiveEstimateController',
            controllerAs: 'vm'
        });
    }
} ());