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
		vm.customer = {};
		vm.customerLogin = customerLogin;

		activate();

		return vm;

		function login(user) {
			var creds = 'username=' + user.username + '&' + 'password=' + user.password;
			$http.post('/login', creds, {
				headers: {
					'content-type': 'application/x-www-form-urlencoded'
				}
			}).then(function (data) {
				if (data.data === true) {
					$http.post('/principal').then(function (data) {
						principal.authenticate(data.data);
						if ($scope.returnToState) $state.go($scope.returnToState.name, $scope.returnToStateParams);
						$state.go('afterAuth');
					});
				} else {
					vm.error = 'Wrong username or password';
				}
			}).catch(function (xhr) {
				vm.error = xhr.responseText;
			});
		}

		function customerLogin() {
			vm.error ='';
			$http.post('/customerLookup', vm.customer).then(function (data) {
				$state.go('customerEstimate',{id: data.data});
			}),function () {
				vm.error = 'Can not found customer with this phone number.';
			};
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
}());