(function () {
    'use strict';

    angular.module('glorem').config(adminRoute);

    adminRoute.$inject = ['$stateProvider'];

    function adminRoute($stateProvider) {
        
        $stateProvider.state('afterAuth', {
            parent: 'site',
            url: '/afterAuth',
            data: {
                roles: ['ROLE_ADMIN']
            },
            templateUrl: 'resources/components/admin/admin.tpl.html',
            controller: 'AdminController',
            controllerAs: 'vm'
        });
        
    }
})();