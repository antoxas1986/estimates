(function() {
	angular
			.module('glorem')
			.controller(
					'custEstController',
					[
							'$scope',
							'custEstService',
							'$window',
							function($scope, custEstService, $window) {
								$scope.estimateForm = [];
								$scope.customer = {};
								$scope.modify = false;

								var id = $window.location.pathname.match(/\d+/)
										.toString();
								custEstService.getEstimate.get({
									id : id
								}).$promise.then(function(data) {
									$scope.estimateForm = data;
								});
								custEstService.getCustomer.get({
									id : id
								}).$promise.then(function(data) {
									$scope.customer = data;
								});

								$scope.update = function() {
									var customerTotal = 0;
									for (var i = 0; i < $scope.estimateForm.length; i++) {
										var list = $scope.estimateForm[i].tjList;
										var chTotal = $scope.estimateForm[i].chapterCount;
										var custTotal = 0;
										for (var j = 0; j < list.length; j++) {
											custTotal += (list[j].total * 1 - list[j].customerTotal * 1);
										}
										$scope.estimateForm[i].chapterCustTotal = (chTotal - custTotal);
										customerTotal += (chTotal - custTotal);
									}
									$scope.customer.updCustomerTotal = customerTotal;
									$scope.customer.updCustomerGrandTotal = (customerTotal - $scope.customer.customerDiscount);
									$scope.customer.status = "ECM"
									custEstService.updateCustomer.update(
											$scope.customer, function() {});
									custEstService.updateEstimate.update(
											$scope.estimateForm, function() {});
									custEstService.sendEmail.send({id:id}, function(){
										alert("We accept your changes. Thank you!");
									});
											
								};

								$scope.recount = function() {
									var customerTotal = 0;
									for (var i = 0; i < $scope.estimateForm.length; i++) {
										var list = $scope.estimateForm[i].tjList;
										var chTotal = $scope.estimateForm[i].chapterCount;
										var custTotal = 0;
										for (var j = 0; j < list.length; j++) {
											custTotal += (list[j].total * 1 - list[j].customerTotal * 1);
										}
										$scope.estimateForm[i].chapterCustTotal = (chTotal - custTotal);
										customerTotal += (chTotal - custTotal);
									}
									$scope.customer.updCustomerTotal = customerTotal;
									$scope.customer.updCustomerGrandTotal = (customerTotal - $scope.customer.customerDiscount);
								};
								$scope.agree = function(){
									custEstService.updateCustomer.agree({id:id}, function() {
										alert("We accept your estimate. Thank you.");
									});
								};
								$scope.decline = function(){
									custEstService.updateCustomer.decline({id:id}, function() {
										alert("Decline. Sorry to here that.");
									});
								};

							} ]);
}());