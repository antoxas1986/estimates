(function() {
	angular.module('glorem').controller(
			'estimateShowController',
			[ '$scope', 'estimateShowService', '$location', '$routeParams',
					function($scope, elsService, $location, $routeParams,$rootScope) {

						$scope.navBar = {
							url : 'resources/share/navBar.html'
						}
						console.info($rootScope);
						$scope.showEstimate = function(){
							console.log($rootScope.id);
						}
						
					} ]);
}());