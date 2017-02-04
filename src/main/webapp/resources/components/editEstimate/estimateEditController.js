(function () {
	angular
		.module('glorem').controller('EditEstimateController', EditEstimateController);

	EditEstimateController.$inject = ['estimateEditService', '$state', '$stateParams', '$window'];

	function EditEstimateController(eeService, $state, $stateParams, $window) {

		var vm = this;
		vm.navBar = '/resources/components/share/navBar.html';
		vm.modify = false;
		vm.estimateForm = [];
		vm.updateEstimate = updateEstimate;
		vm.count = count;
		vm.customer = {};

		var id = $stateParams.id; 

		activate();
		return vm;

		////////////////////////////////////////////////////////

		function activate() {
			eeService.getCustomer.get({
				id: id
			}).$promise.then(function (data) {
				vm.customer = data;
			});
			eeService.getEstimate.get({
				id: id
			}).$promise.then(function (data) {
				vm.estimateForm = data;
			});
		}

		function updateEstimate() {
			var modifyItem = true;
			if (vm.customer.status == 'ES') {
				modifyItem = $window
					.confirm('You are trying to modify estimate that has been sent.');
			}
			if (modifyItem) {
				var customerTotal = 0;
				for (var i = 0; i < vm.estimateForm.length; i++) {
					var list = vm.estimateForm[i].tjList;
					var custTotal = 0;
					for (var j = 0; j < list.length; j++) {
						custTotal += list[j].total * 1;
					}
					vm.estimateForm[i].chapterCount = custTotal;
					customerTotal += custTotal;
				}
				vm.customer.customerTotal = customerTotal;
				vm.customer.updCustomerTotal = customerTotal;
				vm.customer.customerGrandTotal = customerTotal - vm.customer.customerDiscount;
				vm.customer.updCustomerGrandTotal = vm.customer.customerGrandTotal;
				vm.customer.status = 'EC';
				eeService.updateCustomer.update(vm.customer, function () {});

				eeService.updateEstimate
					.save(vm.estimateForm, function () {
						$state.go('estimates');
					});
			}
		}


		function count() {
			var customerTotal = 0;
			for (var i = 0; i < vm.estimateForm.length; i++) {
				var list = vm.estimateForm[i].tjList;
				var total = 0;
				for (var j = 0; j < list.length; j++) {
					total = total + list[j].total * 1;
				}
				vm.estimateForm[i].chapterCount = total;
				customerTotal += total;
			}
			vm.customer.customerTotal = customerTotal;
			vm.customer.updCustomerTotal = customerTotal;
			vm.customer.customerGrandTotal = customerTotal - vm.customer.customerDiscount;
			vm.customer.updCustomerGrandTotal = vm.customer.customerGrandTotal;
		}
	}
}());