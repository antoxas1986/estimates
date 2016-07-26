(function () {
	angular.module('services').factory('itemService', itemService);

	itemService.$inject = ['$http', '$rootScope', '$resource'];

	function itemService($http, $rootScope, $resource) {
		return {
			getChapterList: $resource('/chapters', {}, {
				'get': { method: 'GET', isArray: true }
			}),
			getUnits: $resource('/units', {}, {
				'get': { method: 'GET', isArray: true }
			}),
			saveChaps: $resource('/chapters', {}, {
				'save': { method: 'POST' }
			})
		};
	}

} ());