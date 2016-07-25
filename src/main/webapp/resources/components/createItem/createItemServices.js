(function(){
	angular.module('services').factory('createEstimateService', aService);
	aService.$inject = ['$http','$rootScope','$resource'];
	function aService($http, $rootScope, $resource){
		return {
			getChapterList : $resource('/chapters',{},{
				'get':{method:'GET', isArray:true}
			}),
			getUnits : $resource('/units',{},{
				'get':{method:'GET', isArray:true}
			}),
			saveChaps: $resource('/chapters',{},{
				'save':{method:'POST'}
			})
		}
	}
	
}());