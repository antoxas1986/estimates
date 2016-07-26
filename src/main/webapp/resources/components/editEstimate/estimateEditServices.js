(function(){
	angular.module('services').factory('estimateEditService', eeService);
	eeService.$inject = ['$http','$rootScope','$resource'];
	function eeService($http, $rootScope, $resource){
		return {
			getEstimate : $resource('/showEstimate/:id',{id:'@id'},{
				'get':{method:'GET', isArray:true}
			}),
			updateEstimate: $resource('/updateCustomerEstimate',{},{
				'save': {method:'POST'}
			}),
			updateCustomer: $resource('/customer',{},{
				'update': {method:'POST'}
			}),
			getCustomer : $resource('/customer/:id',{id:'@id'},{
				'get':{method:'GET'}
			})			
		};
	}
	
}());