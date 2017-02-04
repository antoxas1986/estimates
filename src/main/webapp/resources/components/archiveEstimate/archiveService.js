(function () {
    angular.module('services').factory('archiveService', archiveService);

    archiveService.$inject = ['$resource'];

    function archiveService($resource) {
        return {
            getCustomer: $resource('/customers/deactivate', {}, {
                'get': {
                    method: 'GET',
                    isArray: true
                }
            }),
            customer: $resource('/customers/:id', {
                id: '@id'
            }, {
                'remove': {
                    method: 'DELETE'
                }
            }),
            customerUpdate: $resource('/customers', {}, {
                'update': {
                    method: 'PUT'
                }
            })
        };
    }

}());