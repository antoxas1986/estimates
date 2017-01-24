(function () {
	angular
		.module('glorem')
		.controller('AdminController', AdminController);

		AdminController.$ingect = []; 
		
		function AdminController() {
			var vm = this;
			vm.navBar =  '/resources/components/share/navBar.html';
			return vm;
		}
} ());