(function() {
	angular.module('controllers').controller(
			'ModalInstanceCtrl',
			[
					'$rootScope',
					'$scope',
					'$modalInstance',

					function($rootScope, $scope, $modalInstance) {
						
						$scope.cancel = (function() {
							$modalInstance.dismiss('cancel');
						});
					} ]);
})();