(function () {
	angular
		.module('glorem')
		.controller('AdminController', AdminController);

		AdminController.$ingect = ['$scope']; 
		
		function AdminController() {
			var vm = this;
			vm.navBar = 'resources/share/navBar.html';
			return vm;
		}
} ());