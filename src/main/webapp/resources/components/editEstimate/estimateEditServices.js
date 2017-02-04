(function () {
	angular.module('services').factory('estimateEditService', eeService);
	eeService.$inject = ['$resource'];

	function eeService($resource) {
		return {
			getEstimate: $resource('/showEstimate/:id', {
				id: '@id'
			}, {
				'get': {
					method: 'GET',
					isArray: true
				}
			}),
			updateEstimate: $resource('/updateCustomerEstimate', {}, {
				'save': {
					method: 'POST'
				}
			}),
			updateCustomer: $resource('/customers', {}, {
				'update': {
					method: 'PUT'
				}
			}),
			getCustomer: $resource('/customers/:id', {
				id: '@id'
			}, {
				'get': {
					method: 'GET'
				}
			})
		};
	}

}());