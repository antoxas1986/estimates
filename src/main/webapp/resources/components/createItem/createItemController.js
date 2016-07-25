(function() {
	angular.module('glorem').controller('createEstimateController',
			[ '$scope', 'createEstimateService','$location', function($scope, ceService,$location) {
				$scope.chaps = [];
				$scope.navBar = {
					url : 'resources/share/navBar.html'
				}
				ceService.getChapterList.get().$promise.then(function(data) {
					$scope.chapters = data;
				});
				ceService.getUnits.get().$promise.then(function(data){
					$scope.units = data;
				});
				
				$scope.removeFromItem = function(item) {
					$scope.chaps.splice(item, 1);
				};
				
				function chapCreater(chapter){
					$scope.chaps.push({
						chapterName : chapter.name,
						workDescription: "",
						price:"",
						unitName:"",
						minimumCharge:""
					});
				}

				
				$scope.createChapter = function(chapter){
					chapCreater(chapter);
				};
				$scope.add = function (chapter){
					chapCreater(chapter);
				};
				$scope.save = function(chaps){
					ceService.saveChaps.save(chaps, function(){
						window.location.href= '/estimateForm.html';
					})
					
				};
				
			} ]);
}());