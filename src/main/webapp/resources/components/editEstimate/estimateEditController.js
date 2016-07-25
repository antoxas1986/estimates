(function () {
	angular
		.module('glorem')
		.controller(
		'estimateEditController',
		[
			'$scope',
			'estimateEditService',
			'$window',
			function ($scope, eeService, $window) {
				$scope.modify = false;
				$scope.estimateForm = [];

				$scope.navBar = {
					url: '../resources/share/navBar.html'
				};
				var id = $window.location.pathname.match(/\d+/)
					.toString();
				eeService.getCustomer.get({
					id: id
				}).$promise.then(function (data) {
					$scope.customer = data;
				});
				eeService.getEstimate.get({
					id: id
				}).$promise.then(function (data) {
					$scope.estimateForm = data;
				});
				$scope.updateEstimate = function () {
					var modifyItem = true;
					if ($scope.customer.status == 'ES') {
						modifyItem = $window
							.confirm('You try to modify estimate that has been sent.');
					}
					if (modifyItem) {
						var customerTotal = 0;
						for (var i = 0; i < $scope.estimateForm.length; i++) {
							var list = $scope.estimateForm[i].tjList;
							var chTotal = $scope.estimateForm[i].chapterCount;
							var custTotal = 0;
							for (var j = 0; j < list.length; j++) {
								custTotal += list[j].total * 1;
							}
							$scope.estimateForm[i].chapterCount = custTotal;
							customerTotal += custTotal;
						}
						$scope.customer.customerTotal = customerTotal;
						$scope.customer.updCustomerTotal = customerTotal;
						$scope.customer.customerGrandTotal = customerTotal - $scope.customer.customerDiscount;
						$scope.customer.updCustomerGrandTotal = $scope.customer.customerGrandTotal;
						$scope.customer.status = "EC";
						eeService.updateCustomer.update(
							$scope.customer, function () {
							});

						eeService.updateEstimate
							.save(
							$scope.estimateForm,
							function () {
								window.location.href = "/estimates.html";
							});
					}

				};
				$scope.count = function () {
					var customerTotal = 0;
					for (var i = 0; i < $scope.estimateForm.length; i++) {
						var list = $scope.estimateForm[i].tjList;
						var chTotal = $scope.estimateForm[i].chapterCount;

						var total = 0;
						for (var j = 0; j < list.length; j++) {
							total = total + list[j].total * 1;
						}
						$scope.estimateForm[i].chapterCount = total;
						customerTotal += total;
					}
					$scope.customer.customerTotal = customerTotal;
					$scope.customer.updCustomerTotal = customerTotal;
					$scope.customer.customerGrandTotal = customerTotal - $scope.customer.customerDiscount;
					$scope.customer.updCustomerGrandTotal = $scope.customer.customerGrandTotal;

				};

			}]);
} ());