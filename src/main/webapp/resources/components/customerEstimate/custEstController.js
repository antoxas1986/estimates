(function () {
	angular
		.module('glorem').controller('CustomerEstimateController', CustomerEstimateController);

	CustomerEstimateController.$inject = ['custEstService', '$stateParams', '$state'];

	function CustomerEstimateController(custEstService, $stateParams, $state) {
		var vm = this;
		vm.estimateForm = [];
		vm.customer = {};
		vm.modify = false;
		vm.update = update;
		vm.recount = recount;
		vm.agree = agree;
		vm.decline = decline;
		var id = $stateParams.id;

		activate();

		return vm;

		/////////////////////////////////////////////////////////

		function activate() {
			custEstService.getEstimate.get({
				id: id
			}).$promise.then(function (data) {
				vm.estimateForm = data;
			});
			custEstService.getCustomer.get({
				id: id
			}).$promise.then(function (data) {
				vm.customer = data;
			});
		}


		function update() {
			var customerTotal = 0;
			for (var i = 0; i < vm.estimateForm.length; i++) {
				var list = vm.estimateForm[i].tjList;
				var chTotal = vm.estimateForm[i].chapterCount;
				var custTotal = 0;
				for (var j = 0; j < list.length; j++) {
					custTotal += (list[j].total * 1 - list[j].customerTotal * 1);
				}
				vm.estimateForm[i].chapterCustTotal = (chTotal - custTotal);
				customerTotal += (chTotal - custTotal);
			}
			vm.customer.updCustomerTotal = customerTotal;
			vm.customer.updCustomerGrandTotal = (customerTotal - vm.customer.customerDiscount);
			vm.customer.status = 'ECM';
			custEstService.updateCustomer.update(
				vm.customer,
				function () {});
			custEstService.updateEstimate.update(
				vm.estimateForm,
				function () {});
			custEstService.sendEmail.send({
				id: id
			}, function () {
				alert('We accept your changes. Thank you!');
			});

		}

		function recount() {
			console.log('boo');
			var customerTotal = 0;
			for (var i = 0; i < vm.estimateForm.length; i++) {
				var list = vm.estimateForm[i].tjList;
				var chTotal = vm.estimateForm[i].chapterCount;
				var custTotal = 0;
				for (var j = 0; j < list.length; j++) {
					custTotal += (list[j].total * 1 - list[j].customerTotal * 1);
				}
				vm.estimateForm[i].chapterCustTotal = (chTotal - custTotal);
				customerTotal += (chTotal - custTotal);
			}
			console.log(customerTotal);
			vm.customer.updCustomerTotal = customerTotal;
			vm.customer.updCustomerGrandTotal = (customerTotal - vm.customer.customerDiscount);
		}

		function agree() {
			custEstService.updateCustomer.agree({
				id: id
			}, function () {
				alert('We accept your estimate. Thank you.');
				$state.go('/login');
			});
		}

		function decline() {
			custEstService.updateCustomer.decline({
				id: id
			}, function () {
				alert('Decline. Sorry to here that.');
			});
		}

	}
}());