(function(){
	
	angular.module('glorem').factory('createEstimateService', createEstimateService);
	
	createEstimateService.$inject = ['$resource'];
	
	function createEstimateService($resource){
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
			customer: $resource('/customers',{},{
				'save': {method:'POST'},
			}),
			customerCC: $resource('/customers/empty',{},{
				'get':{method: 'GET', isArray:true}
			}),
			
		};
	}
	
}());