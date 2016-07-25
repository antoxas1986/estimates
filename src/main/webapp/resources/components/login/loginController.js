(function () {
	angular
		.module('glorem')
		.controller('LoginController', LoginController);

	LoginController.$inject = ['$scope', 'loginService', '$http', 'principal', '$state', '$location', '$timeout'];

	function LoginController($scope, loginService, $http, principal, $state, $location, $timeout) {
		var vm = this;
		vm.login = login;
		vm.error = '';
		vm.greeting = '';
		vm.user = {};

		activate();

		return vm;

		function login(user) {
			var creds = 'username='+user.username+'&'+'password='+ user.password;
			$http.post('/login', creds, {
				headers: { 'content-type': 'application/x-www-form-urlencoded' }
			}).success(function (data) {
				if (data === true) {
					$http.post('/principal').success(function (data) {
						principal.authenticate(data);
						if ($scope.returnToState) $state.go($scope.returnToState.name, $scope.returnToStateParams);
						$state.go('afterAuth');
					});
				} else {
					vm.error = 'Wrong username or password';
				}
			}).error(function (xhr) {
				vm.error = xhr.responseText;
			});
		}

		function activate() {
			vm.clock = 'loading';
			var tickInterval = 1000;
			var tick = function () {
				vm.clock = Date.now();
				var time = new Date();
				if (time.getHours() < 12) {
					vm.greeting = 'Good morning.';
				}
				if (time.getHours() >= 12 && time.getHours() < 18) {
					vm.greeting = 'Good afternoon.';
				}
				if (time.getHours() >= 18) {
					vm.greeting = 'Good evening.';
				}

				$timeout(tick, tickInterval);
			};
			$timeout(tick, tickInterval);
		}
	}
} ());