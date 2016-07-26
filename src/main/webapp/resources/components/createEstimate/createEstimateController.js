(function () {
	angular
		.module('glorem')
		.controller('CreateEstimateController', CreateEstimateController);

	CreateEstimateController.$inject = ['createEstimateService', '$window'];

	function CreateEstimateController(ceService, $window) {

		var vm = this;
		vm.navBar = 'resources/share/navBar.html';
		vm.saveEstimate = saveEstimate;
		vm.saveCustomer = saveCustomer;
		vm.estimateTypes = getEstimateTypes();
		vm.count = count;
		vm.pull = pull;
		vm.name = '';

		activate();

		vm.customers = [];
		vm.customer = {};
		vm.isCollapsed = false;
		vm.estimateForm = [];
		vm.schemas = [];

		return vm;

		function activate() {
			ceService.customerCC.get().$promise.then(function (data) {
				vm.customers = data;
			});
			ceService.getSchemaNameList.get().$promise.then(function (data) {
				vm.schemas = data;
			});

		}

		function getEstimateTypes() {
			var estimateTypes = [
				{ name: 'Basement' },
				{ name: 'Kitchen' },
				{ name: 'Bathroom' },
				{ name: 'Master Bathroom' },
				{ name: 'Living' },
				{ name: 'Addition' },
				{ name: 'Other' }
			];

			return estimateTypes;
		}

		function pull(name) {
			ceService.getEstimateForm.get({ name: name }).$promise.then(function (data) {
				vm.estimateForm = data;
			});
		}

		function saveEstimate() {
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
			vm.customer.customerGrandTotal = customerTotal
				- vm.customer.customerDiscount;

			vm.customer.status = 'EC';
			ceService.customer.save(vm.customer, function () { });
			ceService.saveEstimate.save(vm.estimateForm, function () {
				$window.location.href = '/estimates.html';
			});
		}

		function saveCustomer() {
			vm.customer.status = 'CC';
			vm.customer.condition = 'customer';
			vm.customer.date = new Date;
			ceService.customer
				.save(
				vm.customer,
				function () {
					alert('Customer saved');
					ceService.customerCC
						.get().$promise
						.then(function (
							data) {
							vm.customers = data;
						});
				});
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
		}

	}
} ());