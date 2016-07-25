(function () {
	angular
		.module('glorem')
		.controller('AdminController', AdminController);

		AdminController.$ingect = ['$scope', 'adminService', '$location']; 
		
		function AdminController($scope, adminService, $location) {
			$scope.navBar = {
				url: 'resources/share/navBar.html'
			};
		}
} ());