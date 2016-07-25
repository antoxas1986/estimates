(function () {
	angular.module('services').factory('chapterService', chapterService);
	chapterService.$inject = ['$http', '$rootScope', '$resource'];
	function chapterService($http, $rootScope, $resource) {
		return {
			chapters: $resource('/chapters/:id', { id: '@id' }, {
				'get': { method: 'GET', isArray: true },
				'remove': { method: 'GET' },
				'put': { method: 'POST' }
			}),
			saveChaps: $resource('/newChapters', {}, {
				'save': { method: 'POST' }
			})
		};
	}

} ());