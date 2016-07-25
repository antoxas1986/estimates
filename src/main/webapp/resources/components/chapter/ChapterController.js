(function () {
	angular
		.module('glorem')
		.controller('ChapterController', ChapterController);

	ChapterController.$inject = ['chapterService', '$window', '$timeout'];

	function ChapterController(chapterService, $window, $timeout) {


		var vm = this;
		vm.navBar = 'resources/share/navBar.html';
		vm.chapter = {};
		vm.chapters = [];
		vm.chaps = [];
		vm.update = update;
		vm.upd = upd;
		vm.close = close;
		vm.add = add;
		vm.deleteDB = deleteDB;
		vm.remove = remove;
		vm.save = save;

		var msg = angular.element(document.querySelector('#msg'));
		var fade = angular.element(document.querySelector('#fade'));

		refresh();
		var x = 0;

		return vm;

		function update(chapter) {
			msg[0].style.display = 'block';
			fade[0].style.display = 'block';
			cdd();
			function cdd() {
				if (x <= 1) {
					x += 0.05;
					msg[0].style.opacity = x;
					$timeout(cdd, 15);
				}
			}
			vm.chapter = chapter;
		}

		function upd(chapter) {
			chapterService.chapters.put(chapter, function () {
				refresh();
			});
			x = 0;
			msg[0].style.display = 'none';
			fade[0].style.display = 'none';
		}

		function close() {
			x = 0;
			msg[0].style.display = 'none';
			fade[0].style.display = 'none';
		}

		function add() {
			vm.chapters.push({
				name: name
			});
		}

		function refresh() {
			chapterService.chapters.get().$promise.then(function (data) {
				vm.chaps = data;
			});
		}

		function deleteDB(id) {
			var removeAlert = $window.confirm('This will DELETE all ITEMS inside this chapter');
			if (removeAlert) {
				chapterService.chapters.remove({ id: id }, function () {
					refresh();
				});
			}
		}

		function remove(item) {
			vm.chapters.splice(item, 1);
		}

		function save() {
			chapterService.saveChaps.save(vm.chapters, function () {
				vm.chapters = '';
				refresh();
			});
		}
	}
} ());