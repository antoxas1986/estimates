(function () {
	'use strict';

	angular.module('glorem').controller('ItemController', ItemController);

	ItemController.$inject = ['itemService', '$state'];

	function ItemController(itemService, $state) {
		var vm = this;

		vm.chaps = [];
		vm.chapters = [];
		vm.units = [];
		vm.chapter = {};


		vm.navBar = 'resources/share/navBar.html';
		vm.removeFromItem = removeFromItem;
		vm.createChapter = createChapter;
		vm.add = add;
		vm.save = save;

		activate();

		return vm;

		//////////////////////////////////////////////////////////////

		function activate() {
			itemService.getChapterList.get().$promise.then(function (data) {
				vm.chapters = data;
			});
			itemService.getUnits.get().$promise.then(function (data) {
				vm.units = data;
			});
		}

		function removeFromItem(item) {
			vm.chaps.splice(item, 1);
		}

		function chapCreater(chapter) {
			vm.chaps.push({
				chapterName: chapter.name,
				workDescription: '',
				price: '',
				unitName: '',
				minimumCharge: ''
			});
		}

		function createChapter(chapter) {
			chapCreater(chapter);
		}
		function add(chapter) {
			chapCreater(chapter);
		}
		function save(chaps) {
			itemService.saveChaps.save(chaps, function () {
				
				$state.go('book');
				//$window.location.href = '/estimateForm.html';
			});
		}
	}
} ());