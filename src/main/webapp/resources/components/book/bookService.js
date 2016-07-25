(function () {
	angular.module('services').factory('bookService', bookService);

	bookService.$inject = ['$http', '$rootScope', '$resource'];

	function bookService($http, $rootScope, $resource) {
		return {
			getItems: $resource('/items', {}, {
				'get': { method: 'GET', isArray: true }
			}),
			item: $resource('/item/:itemId', { itemId: '@itemId' }, {
				'remove': { method: 'DELETE', params: { itemId: '@itemId' } }
			}),
			getEstimateForm: $resource('/getestimate', {}, {
				'get': { method: 'GET', isArray: true }
			}),
			saveForm: $resource('/saveForm', {}, {
				'save': { method: 'POST' }
			})

		};
	}

} ());