(function () {
	angular
		.module('glorem')
		.controller('CreateEstimateController', CreateEstimateController);

	CreateEstimateController.$inject = ['$scope', 'createEstimateService', '$location'];

	function CreateEstimateController($scope, ceService, $location) {

		var CEC = this;
		CEC.navBar = 'resources/share/navBar.html';
		CEC.saveEstimate = saveEstimate;
		CEC.saveCustomer = saveCustomer;
		CEC.estimateTypes = getEstimateTypes();
		CEC.count = count;
		CEC.pull = pull;

		activate();

		$scope.customers = [];
		$scope.customer = {};
		$scope.isCollapsed = false;
		$scope.estimateForm = [];

		return CEC;

		function activate() {
			ceService.customerCC.get().$promise.then(function (data) {
				$scope.customers = data;
			});
			ceService.getSchemaNameList.get().$promise.then(function (data) {
				$scope.schemas = data;
			});

		}

		function getEstimateTypes() {
			var estimateTypes = [
				{ name: "Basement" },
				{ name: "Kitchen" },
				{ name: "Bathroom" },
				{ name: "Master Bathroom" },
				{ name: "Living" },
				{ name: "Addition" },
				{ name: "Other" }
			];

			return estimateTypes;
		}

		function pull(name) {
			ceService.getEstimateForm.get({ name: name }).$promise.then(function (data) {
				$scope.estimateForm = data;
			});
		}

		function saveEstimate() {
			var customerTotal = 0;
			for (var i = 0; i < $scope.estimateForm.length; i++) {
				var list = $scope.estimateForm[i].tjList;
				var total = 0;
				for (var j = 0; j < list.length; j++) {
					total = total + list[j].total * 1;
				}
				$scope.estimateForm[i].chapterCount = total;
				customerTotal += total;
			}
			$scope.customer.customerTotal = customerTotal;
			$scope.customer.customerGrandTotal = customerTotal
				- $scope.customer.customerDiscount

			$scope.customer.status = "EC";
			ceService.customer.save($scope.customer,
				function () { });
			ceService.saveEstimate
				.save(
				$scope.estimateForm,
				function () {
					window.location.href = "/estimates.html";
				});
		}

		function saveCustomer() {
			$scope.customer.status = "CC";
			$scope.customer.condition = "customer";
			$scope.customer.date = new Date;
			console.log($scope.customer.date);
			ceService.customer
				.save(
				$scope.customer,
				function () {
					alert("Customer saved");
					ceService.customerCC
						.get().$promise
						.then(function (
							data) {
							$scope.customers = data;
						});
				});
		}

		function count() {
			var customerTotal = 0;
			for (var i = 0; i < $scope.estimateForm.length; i++) {
				var list = $scope.estimateForm[i].tjList;
				var total = 0;
				for (var j = 0; j < list.length; j++) {
					total = total + list[j].total * 1;
				}
				$scope.estimateForm[i].chapterCount = total;
				customerTotal += total;
			}
			$scope.customer.customerTotal = customerTotal;
		}

	}
} ());