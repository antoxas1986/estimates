(function(){
	angular
	.module('glorem')
	.factory('adminService', adminService);

	adminService.$inject = ['$http','$rootScope','$resource'];
	
	function adminService($http, $rootScope, $resource){
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
		};
	}
	
}());