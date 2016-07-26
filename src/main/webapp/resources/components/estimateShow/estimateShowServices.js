(function(){
	angular.module('services').factory('estimateShowService', esService);
	esService.$inject = ['$http','$rootScope','$resource'];
	function esService($http, $rootScope, $resource){
		return {
			customer : $resource('/customer',{},{
				'get':{method:'GET', isArray:true}
			})			
		};
	}
	
}());