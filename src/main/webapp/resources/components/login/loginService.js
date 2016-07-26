(function() {
	angular.module('services').factory('loginService', aService);
	aService.$inject = [ '$http', '$rootScope', '$resource' ];
	function aService($http, $rootScope, $resource) {
		return {
			validate : $resource('/validate', {}, {
				'post' : {
					method : 'POST'
				}
			})
		};
	}

}());