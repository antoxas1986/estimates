(function () {
	angular
		.module('glorem')
		.controller('EstimatesListController', EstimatesListController);

	EstimatesListController.$inject = ['$scope', 'estimateListShowService', '$location', '$rootScope', '$window'];

	function EstimatesListController($scope, estimateListShowService, $location, $rootScope, $window) {

		var ELC = this;
		ELC.navBar = 'resources/share/navBar.html';
		ELC.editEstimate = editEstimate;
		ELC.remove = remove;
		ELC.sendEstimate = sendEstimate;

		activate();

		return ELC;

		function editEstimate(id) {
			$window.location.href = '/editCustomerEstimate' + id;
		}

		function remove(id) {
			deleteCustomer = $window.confirm('Are you shure you want to DELETE CUSTOMER');
			if (deleteCustomer) {
				estimateListShowService.customer.remove({ id: id }, function () {
					window.location.href = '/estimates';
				});
			}
		}

		function sendEstimate(id) {
			estimateListShowService.sendEstimate.get({
				id: id
			}).$promise.then(function () {
				alert('Estimate send. Thank you.');
			});
		}

		function activate() {
			estimateListShowService.customer.get().$promise.then(function (data) {
				$scope.estimates = data;
			});
		}



		// $scope.showEstimate = function (id) {
		// 	window.location.href = "/showEstimate/"
		// 		+ $rootScope.id;
		// };
		// $rootScope.isCollapsed = true;
		// 

		// $scope.open = function (id) {
		// 	console.log(id);
		// 	var modalInstance = $modal
		// 		.open({
		// 			animation: true,
		// 			templateUrl: 'myModalContent.html',
		// 			controller: 'ModalInstanceCtrl',
		// 			size: 'lg',
		// 			resolve: {
		// 				estimateForm: function () {
		// 					estimateListShowService.estimate
		// 						.get({
		// 							id: id
		// 						}).$promise
		// 						.then(function (
		// 							data) {
		// 							return $rootScope.estimateForm = data;
		// 						})
		// 				}
		// 			}
		// 		});

		// 	modalInstance.result.then(function (
		// 		selectedItem) {
		// 		$scope.selected = selectedItem;
		// 	}, function () {
		// 		console.info('Modal dismissed at: '
		// 			+ new Date());
		// 	});
		// };
		// 

	}
} ());