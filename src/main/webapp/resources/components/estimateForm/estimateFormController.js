(function () {
	angular
		.module('glorem')
		.controller('estimateFormController', BookCtrl);

	BookCtrl.$inject = ['$scope', 'estimateFormService', '$location', '$routeParams', '$window'];

	function BookCtrl($scope, efService, $location, $routeParams, $window) {
		var vm = this;
		vm.
		
		$scope.navBar = {
			url: 'resources/share/navBar.html'
		}
		$scope.form = {
			ids: []
		};
		efService.getItems.get().$promise
			.then(function (data) {
				$scope.items = data;
			});
		$scope.remove = function (itemId) {
			deleteItem = $window
				.confirm('Are you sure you want to delete?');
			if (deleteItem) {
				efService.item
					.remove(
					{
						itemId: itemId
					},
					function () {
						window.location.href = '/estimateForm.html';
					})
			}
		};
		var help = function () {
			efService.getItemsByName.get().promise.then(function (data) {
				$scope.items = data;
			})
		};
		efService.getEstimateForm.get().$promise.then(function (data) {
			$scope.estimateForm = data;
		})


		$scope.createSchema = function () {
			efService.saveForm.save($scope.form, function () {
				window.location.href = "/estimateForm.html";
			});
		};

	}
} ());