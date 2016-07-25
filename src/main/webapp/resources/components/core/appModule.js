/**
 * Angular Main Javascript, Starting point for single page app
 */

(function () {
	angular.module('controllers', []);
	angular.module('directives', []);
	angular.module('services', []);

	angular.module('glorem', [
		'ui.router',
		'directives',
		'services',
		'ngAnimate',
		'ngTable',
		'angular-loading-bar',
		'ngResource',
		'ui.bootstrap'
	]);
} ());