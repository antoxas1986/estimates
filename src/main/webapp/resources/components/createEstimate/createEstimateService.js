(function(){
	
	angular.module('glorem').factory('createEstimateService', createEstimateService);
	
	createEstimateService.$inject = ['$http','$rootScope','$resource'];
	
	function createEstimateService($http, $rootScope, $resource){
		return {
			getSchemaNameList : $resource('/getSchemaNames',{},{
				'get':{method:'GET', isArray:true}
			}),
			getEstimateForm: $resource('/getEstimateForm/:name',{name:'@name'},{
				'get': {method:'GET' , isArray:true}
			}),
			saveEstimate: $resource('/saveCustomerEstimate',{},{
				'save': {method:'POST'}
			}),
			customer: $resource('/customer',{},{
				'save': {method:'POST'},
			}),
			customerCC: $resource('/CC',{},{
				'get':{method: 'GET', isArray:true}
			}),
			
		};
	}
	
}());