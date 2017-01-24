(function () {
	angular
		.module('glorem')
		.controller('BookController', BookController);

	BookController.$inject = ['$state', 'bookService', '$location', '$window'];

	function BookController($state, bookService, $location, $window) {
		var vm = this;
		vm.navBar = '/resources/components/share/navBar.html';
		vm.help = help;
		vm.remove = remove;
		vm.items = {};
		vm.estimateForm = {};
		vm.createSchema = createSchema;
		vm.form = { ids: [] };
		vm.units =[];

		activate();

		return vm;

		//////////////////////////////////////////////////////

		function activate() {
			bookService.getItems.get().$promise.then(function (data) {
				vm.items = data;
			});

			bookService.getEstimateForm.get().$promise.then(function (data) {
				vm.estimateForm = data;
			});

			bookService.getUnits.get().$promise.then(function (data) {
				vm.units = data;
			});
		}

		function remove(itemId) {
			var deleteItem = $window.confirm('Are you sure you want to delete?');
			if (deleteItem) {
				bookService.item.remove({ itemId: itemId }, function () {
					activate();
					$state.go('book');
				});
			}
		}

		function help() {
			bookService.getItemsByName.get().promise.then(function (data) {
				vm.items = data;
			});
		}

		function createSchema() {
			bookService.saveForm.save(vm.form, function () {
				vm.form = { ids: [] };
				$state.go('book');
			});
		}
	}
} ());