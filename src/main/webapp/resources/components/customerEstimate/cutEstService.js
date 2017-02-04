(function () {
	angular.module('services').factory('custEstService', custEstService);

	custEstService.$inject = ['$resource'];

	function custEstService($resource) {
		return {
			getEstimate: $resource('/showEstimate/:id', {
				id: '@id'
			}, {
				get: {
					method: 'GET',
					isArray: true
				}
			}),
			getCustomer: $resource('/customers/:id', {
				id: '@id'
			}, {
				get: {
					method: 'GET'
				}
			}),
			updateCustomer: $resource('/customers', {}, {
				'update': {
					method: 'PUT'
				}
			}),
			updateEstimate: $resource('/updateCustomerEstimate', {}, {
				'update': {
					method: 'POST'
				}
			}),
			sendEmail: $resource('/emailEstimateFromCustomer/:id', {
				id: '@id'
			}, {
				'send': {
					method: 'GET'
				}
			})
		};
	}

}());