(function () {
	angular
		.module('glorem')
		.controller('EstimatesListController', EstimatesListController);

	EstimatesListController.$inject = ['$state', 'estimateListService', '$location', '$rootScope', '$window'];

	function EstimatesListController($state, estimateListService, $location, $rootScope, $window) {

		var vm = this;
		vm.navBar = '/resources/components/share/navBar.html';
		vm.remove = remove;
		vm.sendEstimate = sendEstimate;
		vm.estimates = [];

		activate();

		return vm;

		function remove(estimate) {
			var archiveCustomer = $window.confirm('Are you shure you want to archive ' + estimate.name + ' ' + estimate.lastName + ' estimate');
			if (archiveCustomer) {
				estimate.status = 'DC';
				estimate.active = false;
				estimateListService.customer.update(estimate, function () {
					vm.estimates.splice(vm.estimates.indexOf(estimate), 1);
					$state.go('estimates');
				});
			}
		}

		function sendEstimate(customer) {
			customer.status = 'ES';
			estimateListService.sendEstimate.send(customer).$promise.then(function () {
				alert('Estimate send. Thank you.');
				vm.estimates.forEach(function(element) {
					if(element.id == customer.id){
						element.status = 'ES';
					}	
				});
			});
		}

		function activate() {
			estimateListService.customer.get().$promise.then(function (data) {
				vm.estimates = data;
			});
		}
	}
}());