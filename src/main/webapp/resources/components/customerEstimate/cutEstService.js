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
			getCustomer: $resource('/customer/:id', {
				id: '@id'
			}, {
				get: {
					method: 'GET'
				}
			}),
			updateCustomer: $resource('/customer', {
				id: '@id'
			}, {
				'update': {
					method: 'POST'
				},
				'agree': {
					url: '/customerAgree/:id',
					method: 'GET'
				},
				'decline': {
					url: '/customerDecline/:id',
					method: 'GET'
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
		}
	}

}());