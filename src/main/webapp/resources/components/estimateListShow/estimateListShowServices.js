(function(){
	angular.module('services').factory('estimateListShowService', elsService);
	elsService.$inject = ['$http','$rootScope','$resource'];
	function elsService($http, $rootScope, $resource){
		return {
			customer : $resource('/customer/:id',{id:'@id'},{
				'get':{method:'GET', isArray:true},
				'remove':{method:'POST'}
			
			}),
			estimate:$resource('/showEstimate/:id',{id:'@id'},{
				'get':{method:'GET', isArray:true}				
			}),
			editEstimate:$resource('/editCustomerEstimate/:id',{id:'@id'},{
				'get':{method:'GET'}
			}),
			sendEstimate: $resource('/sendEstimate/:id',{id:'@id'},{
				'get': {method:'GET'}
			})
		}
	}
	
}());