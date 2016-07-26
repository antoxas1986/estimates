(function () {
    'use strict';

    angular.module('glorem').config(itemRoute);

    itemRoute.$inject = ['$stateProvider'];

    function itemRoute($stateProvider) {
        $stateProvider.state('item', {
            parent: 'site',
            url: '/item',
            data: {
                roles: ['ROLE_ADMIN']
            },
            templateUrl: 'resources/components/item/item.tpl.html',
            controller: 'ItemController',
            controllerAs: 'vm'
        });
    }
} ());