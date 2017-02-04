(function () {
    'use strict';

    angular
        .module('glorem')
        .factory('templatesService', templatesService);

    templatesService.$inject = ['$resource'];

    function templatesService($resource) {
        return {
            getSchemaNameList: $resource('/getSchemaNames', {}, {
                'get': {
                    method: 'GET',
                    isArray: true
                }
            }),
            getEstimateForm: $resource('/getEstimateForm/:name', {
                name: '@name'
            }, {
                'get': {
                    method: 'GET',
                    isArray: true
                }
            }),
            updateTemplateName: $resource('/templateName', {}, {
                'update': {
                    method: 'PUT'
                }
            }),
            deleteTemplate: $resource('/templateName/:name', {
                name: '@name'
            }, {
                'delete': {
                    method: 'DELETE'
                }
            })
        };
    }
})();