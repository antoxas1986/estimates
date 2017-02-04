(function () {
	angular.module('services').factory('estimateListService', elsService);
	elsService.$inject = ['$http', '$rootScope', '$resource'];

	function elsService($http, $rootScope, $resource) {
		return {
			customer: $resource('/customers', {}, {
				'get': {
					method: 'GET',
					isArray: true
				},
				'update': {
					method: 'PUT'
				}
			}),
			estimate: $resource('/showEstimate/:id', {
				id: '@id'
			}, {
				'get': {
					method: 'GET',
					isArray: true
				}
			}),
			editEstimate: $resource('/editCustomerEstimate/:id', {
				id: '@id'
			}, {
				'get': {
					method: 'GET'
				}
			}),
			sendEstimate: $resource('/sendEstimate', {}, {
				'send': {
					method: 'POST'
				}
			})
		};
	}

}());