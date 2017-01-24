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
			var deleteCustomer = $window.confirm('Are you shure you want to delete ' + estimate.name + ' ' + estimate.lastName + ' estimate');
			if (deleteCustomer) {
				estimateListService.customer.remove({
					id: estimate.id
				}, function () {
					vm.estimates.splice(vm.estimates.indexOf(estimate), 1);
					$state.go('estimates');
				});
			}
		}

		function sendEstimate(id) {
			estimateListService.sendEstimate.get({
				id: id
			}).$promise.then(function () {
				alert('Estimate send. Thank you.');
			});
		}

		function activate() {
			estimateListService.customer.get().$promise.then(function (data) {
				vm.estimates = data;
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
}());