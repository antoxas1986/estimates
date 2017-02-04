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
		// 'ngTable',
		'angular-loading-bar',
		'ngResource',
		'ui.bootstrap',
		'ui.mask'
	]);
	
} ());
(function () {
    'use strict';

    angular
        .module('glorem')
        .factory('templatesService', templatesService);

    templatesService.$inject = ['$resource'];

    function templatesService($resource) {
        return {
            getSchemaNameList: $resource('/getSchemaNames', {}, {
                'get': {
                    method: 'GET',
                    isArray: true
                }
            }),
            getEstimateForm: $resource('/getEstimateForm/:name', {
                name: '@name'
            }, {
                'get': {
                    method: 'GET',
                    isArray: true
                }
            }),
            updateTemplateName: $resource('/templateName', {}, {
                'update': {
                    method: 'PUT'
                }
            }),
            deleteTemplate: $resource('/templateName/:name', {
                name: '@name'
            }, {
                'delete': {
                    method: 'DELETE'
                }
            })
        };
    }
})();
(function () {
    'use strict';

    angular.module('glorem').config(createEstimateRoute);

    createEstimateRoute.$inject = ['$stateProvider'];

    function createEstimateRoute($stateProvider) {
        $stateProvider.state('templates', {
            parent: 'site',
            url: '/templates',
            data: {
                roles: ['ROLE_ADMIN']
            },
            templateUrl: '/resources/components/templates/templates.tpl.html',
            controller: 'TemplatesController',
            controllerAs: 'vm'
        });
    }
} ());
(function () {
    'use strict';

    angular
        .module('glorem')
        .controller('TemplatesController', TemplatesController);

    TemplatesController.inject = ['$state', 'templatesService', '$window'];

    function TemplatesController($state, templatesService, $window) {
        var vm = this;
        vm.navBar = '/resources/components/share/navBar.html';
        vm.schemas = [];
        vm.estimateForm = [];
        vm.templateName = '';
        vm.oldTemplateName = '';
        vm.updateTemplateName = updateTemplateName;
        vm.deleteTemplate = deleteTemplate;

        vm.getEstimateForm = getEstimateForm;

        activate();

        ////////////////

        function activate() {
            templatesService.getSchemaNameList.get().$promise.then(function (data) {
                vm.schemas = data;
            });

        }

        function updateTemplateName() {
            templatesService.updateTemplateName.update([vm.oldTemplateName, vm.templateName]).$promise.then(function () {
                activate();
            });
        }

        function deleteTemplate(name) {
            var delTemp = $window.confirm('Are you shure you want to delete ' + name + ' estimate template');
            if (delTemp) {
                templatesService.deleteTemplate.delete({
                    name: name
                }).$promise.then(function () {
                    vm.estimateForm = [];
                    activate();

                });
            }
        }

        function getEstimateForm(name) {
            templatesService.getEstimateForm.get({
                name: name
            }).$promise.then(function (data) {
                vm.estimateForm = data;
                vm.oldTemplateName = name;
            });
        }
    }
})();
(function() {
	angular.module('services').factory('loginService', aService);
	aService.$inject = [ '$http', '$rootScope', '$resource' ];
	function aService($http, $rootScope, $resource) {
		return {
			validate : $resource('/validate', {}, {
				'post' : {
					method : 'POST'
				}
			})
		};
	}

}());
(function () {
    'use strict';

    angular
        .module('glorem')
        .config(loginRoute);

    loginRoute.$inject = ['$stateProvider', '$urlRouterProvider'];

    function loginRoute($stateProvider, $urlRouterProvider) {

        $urlRouterProvider.otherwise('/');

        $stateProvider.state('site', {
            'abstract': true,
            resolve: {
                authorize: ['authorization',
                    function (authorization) {
                        return authorization.authorize();
                    }
                ]
            },
            template: '<ui-view />'
        });
        
        $stateProvider.state('/', {
            url: '/',
            data: {
                roles: []
            },
            templateUrl: '/resources/components/login/login.tpl.html',
            controller: 'LoginController',
            controllerAs: 'vm'
        });
        
        $stateProvider.state('accessdenied', {
            url: '/accessdenied',
            data: {
                roles: []
            },
            templateUrl: '/resources/components/error/403.tpl.html',
            controller: 'LoginController',
            controllerAs: 'vm'
        });
        
        
    }
} ());
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
(function () {
	angular.module('services').factory('itemService', itemService);

	itemService.$inject = ['$http', '$rootScope', '$resource'];

	function itemService($http, $rootScope, $resource) {
		return {
			getChapterList: $resource('/chapters', {}, {
				'get': { method: 'GET', isArray: true }
			}),
			getUnits: $resource('/units', {}, {
				'get': { method: 'GET', isArray: true }
			}),
			saveChaps: $resource('/chapters', {}, {
				'save': { method: 'POST' }
			})
		};
	}

} ());
(function () {
    'use strict';

    angular.module('glorem').config(itemRoute);

    itemRoute.$inject = ['$stateProvider'];

    function itemRoute($stateProvider) {
        $stateProvider.state('item', {
            parent: 'site',
            url: '/item',
            data: {
                roles: ['ROLE_ADMIN']
            },
            templateUrl: '/resources/components/item/item.tpl.html',
            controller: 'ItemController',
            controllerAs: 'vm'
        });
    }
} ());
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


		vm.navBar = '/resources/components/share/navBar.html';
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
				chapterName: vm.chapter.name,
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
			});
		}
	}
} ());
(function () {
    'use strict';

    angular.module('glorem').config(estimatesRoute);

    estimatesRoute.$inject = ['$stateProvider'];

    function estimatesRoute($stateProvider) {
        $stateProvider.state('estimates', {
            parent: 'site',
            url: '/estimates',
            data: {
                roles: ['ROLE_ADMIN']
            },
            templateUrl: '/resources/components/estimatesList/estimatesList.tpl.html',
            controller: 'EstimatesListController',
            controllerAs: 'vm'
        });
    }
} ());
(function () {
	angular.module('services').factory('estimateListService', elsService);
	elsService.$inject = ['$http', '$rootScope', '$resource'];

	function elsService($http, $rootScope, $resource) {
		return {
			customer: $resource('/customers', {}, {
				'get': {
					method: 'GET',
					isArray: true
				},
				'update': {
					method: 'PUT'
				}
			}),
			estimate: $resource('/showEstimate/:id', {
				id: '@id'
			}, {
				'get': {
					method: 'GET',
					isArray: true
				}
			}),
			editEstimate: $resource('/editCustomerEstimate/:id', {
				id: '@id'
			}, {
				'get': {
					method: 'GET'
				}
			}),
			sendEstimate: $resource('/sendEstimate', {}, {
				'send': {
					method: 'POST'
				}
			})
		};
	}

}());
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
			var archiveCustomer = $window.confirm('Are you shure you want to archive ' + estimate.name + ' ' + estimate.lastName + ' estimate');
			if (archiveCustomer) {
				estimate.status = 'DC';
				estimate.active = false;
				estimateListService.customer.update(estimate, function () {
					vm.estimates.splice(vm.estimates.indexOf(estimate), 1);
					$state.go('estimates');
				});
			}
		}

		function sendEstimate(customer) {
			customer.status = 'ES';
			estimateListService.sendEstimate.send(customer).$promise.then(function () {
				alert('Estimate send. Thank you.');
				vm.estimates.forEach(function(element) {
					if(element.id == customer.id){
						element.status = 'ES';
					}	
				});
			});
		}

		function activate() {
			estimateListService.customer.get().$promise.then(function (data) {
				vm.estimates = data;
			});
		}
	}
}());
(function () {
	angular.module('services').factory('custEstService', custEstService);

	custEstService.$inject = ['$resource'];

	function custEstService($resource) {
		return {
			getEstimate: $resource('/showEstimate/:id', {
				id: '@id'
			}, {
				get: {
					method: 'GET',
					isArray: true
				}
			}),
			getCustomer: $resource('/customers/:id', {
				id: '@id'
			}, {
				get: {
					method: 'GET'
				}
			}),
			updateCustomer: $resource('/customers', {}, {
				'update': {
					method: 'PUT'
				}
			}),
			updateEstimate: $resource('/updateCustomerEstimate', {}, {
				'update': {
					method: 'POST'
				}
			}),
			sendEmail: $resource('/emailEstimateFromCustomer/:id', {
				id: '@id'
			}, {
				'send': {
					method: 'GET'
				}
			})
		};
	}

}());
(function () {
    'use strict';

    angular.module('glorem').config(customerEstimateRoute);

    customerEstimateRoute.$inject = ['$stateProvider'];

    function customerEstimateRoute($stateProvider) {
        $stateProvider.state('customerEstimate', {
            parent: 'site',
            url: '/customerEstimate/:id',
            data: {
                roles: []
            },
            templateUrl: '/resources/components/customerEstimate/customerEstimate.tpl.html',
            controller: 'CustomerEstimateController',
            controllerAs: 'vm'
        });
    }
}());
(function () {
	angular
		.module('glorem').controller('CustomerEstimateController', CustomerEstimateController);

	CustomerEstimateController.$inject = ['custEstService', '$stateParams', '$state'];

	function CustomerEstimateController(custEstService, $stateParams, $state) {
		var vm = this;
		vm.estimateForm = [];
		vm.customer = {};
		vm.modify = false;
		vm.update = update;
		vm.recount = recount;
		vm.agree = agree;
		vm.decline = decline;
		var id = $stateParams.id;

		activate();

		return vm;

		/////////////////////////////////////////////////////////

		function activate() {
			custEstService.getEstimate.get({
				id: id
			}).$promise.then(function (data) {
				vm.estimateForm = data;
			});
			custEstService.getCustomer.get({
				id: id
			}).$promise.then(function (data) {
				vm.customer = data;
			});
		}


		function update() {
			var customerTotal = 0;
			for (var i = 0; i < vm.estimateForm.length; i++) {
				var list = vm.estimateForm[i].tjList;
				var chTotal = vm.estimateForm[i].chapterCount;
				var custTotal = 0;
				for (var j = 0; j < list.length; j++) {
					custTotal += (list[j].total * 1 - list[j].customerTotal * 1);
				}
				vm.estimateForm[i].chapterCustTotal = (chTotal - custTotal);
				customerTotal += (chTotal - custTotal);
			}
			vm.customer.updCustomerTotal = customerTotal;
			vm.customer.updCustomerGrandTotal = (customerTotal - vm.customer.customerDiscount);
			vm.customer.status = 'ECM';
			custEstService.updateCustomer.update(vm.customer, function () {});
			custEstService.updateEstimate.update(vm.estimateForm, function () {});
			custEstService.sendEmail.send({
				id: id
			}, function () {
				alert('We accept your changes. Thank you!');
				$state.go('/');
			});

		}

		function recount() {
			var customerTotal = 0;
			for (var i = 0; i < vm.estimateForm.length; i++) {
				var list = vm.estimateForm[i].tjList;
				var chTotal = vm.estimateForm[i].chapterCount;
				var custTotal = 0;
				for (var j = 0; j < list.length; j++) {
					custTotal += (list[j].total * 1 - list[j].customerTotal * 1);
				}
				vm.estimateForm[i].chapterCustTotal = (chTotal - custTotal);
				customerTotal += (chTotal - custTotal);
			}
			vm.customer.updCustomerTotal = customerTotal;
			vm.customer.updCustomerGrandTotal = (customerTotal - vm.customer.customerDiscount);
		}

		function agree(customer) {
			customer.status = 'EA';
			custEstService.updateCustomer.update(customer, function () {
				alert('We accept your estimate. Thank you.');
				$state.go('/');
			});
		}

		function decline(customer) {
			customer.status = 'ED';
			custEstService.updateCustomer.decline(customer, function () {
				alert('Decline. Sorry to here that.');
				$state.go('/');
			});
		}

	}
}());
(function () {
	angular.module('services').factory('estimateEditService', eeService);
	eeService.$inject = ['$resource'];

	function eeService($resource) {
		return {
			getEstimate: $resource('/showEstimate/:id', {
				id: '@id'
			}, {
				'get': {
					method: 'GET',
					isArray: true
				}
			}),
			updateEstimate: $resource('/updateCustomerEstimate', {}, {
				'save': {
					method: 'POST'
				}
			}),
			updateCustomer: $resource('/customers', {}, {
				'update': {
					method: 'PUT'
				}
			}),
			getCustomer: $resource('/customers/:id', {
				id: '@id'
			}, {
				'get': {
					method: 'GET'
				}
			})
		};
	}

}());
(function () {
	angular
		.module('glorem').controller('EditEstimateController', EditEstimateController);

	EditEstimateController.$inject = ['estimateEditService', '$state', '$stateParams', '$window'];

	function EditEstimateController(eeService, $state, $stateParams, $window) {

		var vm = this;
		vm.navBar = '/resources/components/share/navBar.html';
		vm.modify = false;
		vm.estimateForm = [];
		vm.updateEstimate = updateEstimate;
		vm.count = count;
		vm.customer = {};

		var id = $stateParams.id; 

		activate();
		return vm;

		////////////////////////////////////////////////////////

		function activate() {
			eeService.getCustomer.get({
				id: id
			}).$promise.then(function (data) {
				vm.customer = data;
			});
			eeService.getEstimate.get({
				id: id
			}).$promise.then(function (data) {
				vm.estimateForm = data;
			});
		}

		function updateEstimate() {
			var modifyItem = true;
			if (vm.customer.status == 'ES') {
				modifyItem = $window
					.confirm('You are trying to modify estimate that has been sent.');
			}
			if (modifyItem) {
				var customerTotal = 0;
				for (var i = 0; i < vm.estimateForm.length; i++) {
					var list = vm.estimateForm[i].tjList;
					var custTotal = 0;
					for (var j = 0; j < list.length; j++) {
						custTotal += list[j].total * 1;
					}
					vm.estimateForm[i].chapterCount = custTotal;
					customerTotal += custTotal;
				}
				vm.customer.customerTotal = customerTotal;
				vm.customer.updCustomerTotal = customerTotal;
				vm.customer.customerGrandTotal = customerTotal - vm.customer.customerDiscount;
				vm.customer.updCustomerGrandTotal = vm.customer.customerGrandTotal;
				vm.customer.status = 'EC';
				eeService.updateCustomer.update(vm.customer, function () {});

				eeService.updateEstimate
					.save(vm.estimateForm, function () {
						$state.go('estimates');
					});
			}
		}


		function count() {
			var customerTotal = 0;
			for (var i = 0; i < vm.estimateForm.length; i++) {
				var list = vm.estimateForm[i].tjList;
				var total = 0;
				for (var j = 0; j < list.length; j++) {
					total = total + list[j].total * 1;
				}
				vm.estimateForm[i].chapterCount = total;
				customerTotal += total;
			}
			vm.customer.customerTotal = customerTotal;
			vm.customer.updCustomerTotal = customerTotal;
			vm.customer.customerGrandTotal = customerTotal - vm.customer.customerDiscount;
			vm.customer.updCustomerGrandTotal = vm.customer.customerGrandTotal;
		}
	}
}());
(function () {
    'use strict';

    angular.module('glorem').config(editEstimateRoute);

    editEstimateRoute.$inject = ['$stateProvider'];

    function editEstimateRoute($stateProvider) {
        $stateProvider.state('editEstimate', {
            parent: 'site',
            url: '/editEstimate/:id',
            data: {
                roles: ['ROLE_ADMIN']
            },
            templateUrl: '/resources/components/editEstimate/editEstimate.tpl.html',
            controller: 'EditEstimateController',
            controllerAs: 'vm'
        });
    }
}());
(function(){
	
	angular.module('glorem').factory('createEstimateService', createEstimateService);
	
	createEstimateService.$inject = ['$resource'];
	
	function createEstimateService($resource){
		return {
			getSchemaNameList : $resource('/getSchemaNames',{},{
				'get':{method:'GET', isArray:true}
			}),
			getEstimateForm: $resource('/getEstimateForm/:name',{name:'@name'},{
				'get': {method:'GET' , isArray:true}
			}),
			saveEstimate: $resource('/saveCustomerEstimate',{},{
				'save': {method:'POST'}
			}),
			customer: $resource('/customers',{},{
				'save': {method:'POST'},
			}),
			customerCC: $resource('/customers/empty',{},{
				'get':{method: 'GET', isArray:true}
			}),
			
		};
	}
	
}());
(function () {
    'use strict';

    angular.module('glorem').config(createEstimateRoute);

    createEstimateRoute.$inject = ['$stateProvider'];

    function createEstimateRoute($stateProvider) {
        $stateProvider.state('createEstimate', {
            parent: 'site',
            url: '/createEstimate',
            data: {
                roles: ['ROLE_ADMIN']
            },
            templateUrl: '/resources/components/createEstimate/createEstimate.tpl.html',
            controller: 'CreateEstimateController',
            controllerAs: 'vm'
        });
    }
} ());
(function () {
	angular
		.module('glorem')
		.controller('CreateEstimateController', CreateEstimateController);

	CreateEstimateController.$inject = ['createEstimateService', '$state'];

	function CreateEstimateController(ceService, $state) {

		var vm = this;
		vm.navBar = '/resources/components/share/navBar.html';
		vm.saveEstimate = saveEstimate;
		vm.saveCustomer = saveCustomer;
		vm.estimateTypes = getEstimateTypes();
		vm.count = count;
		vm.pull = pull;
		vm.name = '';

		activate();

		vm.customers = [];
		vm.customer = {};
		vm.isCollapsed = false;
		vm.estimateForm = [];
		vm.schemas = [];

		return vm;

		function activate() {
			ceService.customerCC.get().$promise.then(function (data) {
				vm.customers = data;
			});
			ceService.getSchemaNameList.get().$promise.then(function (data) {
				vm.schemas = data;
			});

		}

		function getEstimateTypes() {
			var estimateTypes = [{
					name: 'Basement'
				},
				{
					name: 'Kitchen'
				},
				{
					name: 'Bathroom'
				},
				{
					name: 'Master Bathroom'
				},
				{
					name: 'Living'
				},
				{
					name: 'Addition'
				},
				{
					name: 'Other'
				}
			];

			return estimateTypes;
		}

		function pull(name) {
			ceService.getEstimateForm.get({
				name: name
			}).$promise.then(function (data) {
				vm.estimateForm = data;
			});
		}

		function saveEstimate() {
			var customerTotal = 0;
			for (var i = 0; i < vm.estimateForm.length; i++) {
				var list = vm.estimateForm[i].tjList;
				var total = 0;
				for (var j = 0; j < list.length; j++) {
					total = total + list[j].total * 1;
					list[j].customerId = vm.customer.id;
				}
				vm.estimateForm[i].chapterCount = total;
				customerTotal += total;
			}
			vm.customer.customerTotal = customerTotal;
			vm.customer.customerGrandTotal = customerTotal -
				vm.customer.customerDiscount;

			vm.customer.status = 'EC';
			ceService.customer.save(vm.customer, function () {});
			ceService.saveEstimate.save(vm.estimateForm, function () {
				$state.go('estimates');
			});
		}

		function saveCustomer() {
			vm.customer.status = 'CC';
			vm.customer.condition = 'customer';
			vm.customer.date = new Date;
			ceService.customer.save(vm.customer, function () {
				alert('Customer saved');
				ceService.customerCC.get().$promise.then(function (data) {
					vm.customers = data;
				});
			});
		}

		function count() {
			var customerTotal = 0;
			for (var i = 0; i < vm.estimateForm.length; i++) {
				var list = vm.estimateForm[i].tjList;
				var total = 0;
				for (var j = 0; j < list.length; j++) {
					total = total + list[j].total * 1;
				}
				vm.estimateForm[i].chapterCount = total;
				customerTotal += total;
			}
			vm.customer.customerTotal = customerTotal;
		}

	}
}());
(function () {
	angular.module('services').factory('chapterService', chapterService);
	chapterService.$inject = ['$http', '$rootScope', '$resource'];
	function chapterService($http, $rootScope, $resource) {
		return {
			chapters: $resource('/chapters/:id', { id: '@id' }, {
				'get': { method: 'GET', isArray: true },
				'remove': { method: 'GET' },
				'put': { method: 'POST' }
			}),
			saveChaps: $resource('/newChapters', {}, {
				'save': { method: 'POST' }
			})
		};
	}

} ());
(function () {
    'use strict';

    angular.module('glorem').config(chapterRoute);

    chapterRoute.$inject = ['$stateProvider'];

    function chapterRoute($stateProvider) {
        $stateProvider.state('chapter', {
            parent: 'site',
            url: '/chapter',
            data: {
                roles: ['ROLE_ADMIN']
            },
            templateUrl: '/resources/components/chapter/chapter.tpl.html',
            controller: 'ChapterController',
            controllerAs: 'vm'
        });
    }
} ());
(function () {
	angular
		.module('glorem')
		.controller('ChapterController', ChapterController);

	ChapterController.$inject = ['chapterService', '$window', '$timeout'];

	function ChapterController(chapterService, $window, $timeout) {


		var vm = this;
		vm.navBar = '/resources/components/share/navBar.html';
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
(function () {
    angular
        .module('glorem')
        .run(runApp);

    runApp.$inject = ['$rootScope', '$state', '$stateParams', 'authorization', 'principal','helpers'];

    function runApp($rootScope, $state, $stateParams, authorization, principal, helpers) {
        var unregister = $rootScope.$on('$stateChangeStart', function (event, toState, toStateParams) {
            $rootScope.toState = toState;
            $rootScope.toStateParams = toStateParams;

            if (principal.isIdentityResolved()) authorization.authorize();
        });

        $rootScope.helpers = helpers;
    }
} ());
(function () {
    angular
        .module('glorem')
        .factory('principal', principal);

    principal.$inject = ['$q', '$http'];

    function principal($q, $http) {
        var _identity = undefined,
            _authenticated = false;

        return {
            isIdentityResolved: function () {
                return angular.isDefined(_identity);
            },
            isAuthenticated: function () {
                return _authenticated;
            },
            isInRole: function (role) {
                if (!_authenticated || !_identity.authorities) return false;
                return _identity.authorities.map(function (e) { return e.authority; }).indexOf(role) != -1;
            },
            isInAnyRole: function (roles) {
                if (!_authenticated || !_identity.authorities) return false;

                for (var i = 0; i < roles.length; i++) {
                    if (this.isInRole(roles[i])) {
                        return true;
                    }
                }

                return false;
            },
            authenticate: function (identity) {
                _identity = identity;
                _authenticated = identity != null;

                // for this demo, we'll store the identity in localStorage. For you, it could be a cookie, sessionStorage, whatever
                if (identity) localStorage.setItem('glorem.identity', angular.toJson(identity));
                else localStorage.removeItem('glorem.identity');
            },
            identity: function (force) {
                var deferred = $q.defer();

                if (force === true) _identity = undefined;

                // check and see if we have retrieved the identity data from the server. if we have, reuse it by immediately resolving
                if (angular.isDefined(_identity)) {
                    deferred.resolve(_identity);

                    return deferred.promise;
                }

                // otherwise, retrieve the identity data from the server, update the identity object, and then resolve.
                $http.post('/principal', { ignoreErrors: true })
                    .then(function (data) {
                        _identity = data.data;
                        _authenticated = true;
                        deferred.resolve(_identity);
                    })
                    .catch(function () {
                        _identity = null;
                        _authenticated = false;
                        deferred.resolve(_identity);
                    });



                return deferred.promise;
            }
        };
    }
} ());
(function () {
    angular
        .module('glorem')
        .factory('helpers', helpers);

    helpers.$inject = ['$state', '$http', 'principal'];

    function helpers($state, $http, principal) {
        return {
            singout: function () {
                $http.post('/logout');
                principal.authenticate(null);
                $state.go('/');
            }
        };
    }
} ());
(function () {
    angular
        .module('glorem')
        .factory('authorization', authorization);

    authorization.$inject = ['$rootScope', '$state', 'principal'];

    function authorization($rootScope, $state, principal) {
        return {
            authorize: function () {
                return principal.identity()
                    .then(function () {
                        var isAuthenticated = principal.isAuthenticated();
                        
                        if ($rootScope.toState.data.roles && $rootScope.toState.data.roles.length > 0 && !principal.isInAnyRole($rootScope.toState.data.roles)) {
                            if (isAuthenticated) $state.go('accessdenied'); // user is signed in but not authorized for desired state
                            else {
                                // user is not authenticated. stow the state they wanted before you
                                // send them to the signin state, so you can return them when you're done
                                $rootScope.returnToState = $rootScope.toState;
                                $rootScope.returnToStateParams = $rootScope.toStateParams;

                                // now, send them to the signin state so they can log in
                                $state.go('/');
                            }
                        }
                    });
            }
        };
    }

} ());
(function () {
	angular.module('services').factory('bookService', bookService);

	bookService.$inject = ['$http', '$rootScope', '$resource'];

	function bookService($http, $rootScope, $resource) {
		return {
			getItems: $resource('/items', {}, {
				'get': { method: 'GET', isArray: true }
			}),
			item: $resource('/item/:itemId', { itemId: '@itemId' }, {
				'remove': { method: 'DELETE', params: { itemId: '@itemId' } }
			}),
			getEstimateForm: $resource('/getestimate', {}, {
				'get': { method: 'GET', isArray: true }
			}),
			saveForm: $resource('/saveForm', {}, {
				'save': { method: 'POST' }
			}),
			getUnits: $resource('/units', {}, {
				'get': { method: 'GET', isArray: true }
			}),
			updateItem: $resource('/updateItem', {}, {
				'put': { method: 'PUT' }
			})

		};
	}

} ());
(function () {
    'use strict';

    angular.module('glorem').config(estimatesRoute);

    estimatesRoute.$inject = ['$stateProvider'];

    function estimatesRoute($stateProvider) {
        $stateProvider.state('book', {
            parent: 'site',
            url: '/book',
            data: {
                roles: ['ROLE_ADMIN']
            },
            templateUrl: '/resources/components/book/book.tpl.html',
            controller: 'BookController',
            controllerAs: 'vm'
        });
    }
} ());
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
		vm.form = {
			ids: []
		};
		vm.originalEstimateForm = [];
		vm.units = [];
		vm.isEdit = false;
		vm.updateItem = updateItem;
		vm.startEdit = startEdit;
		vm.cancelEdit = cancelEdit;

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
				vm.units.push({id: -1, name: ''});
			});
		}

		function updateItem(item, isEdit) {
			bookService.updateItem.put(item, function () {
				return isEdit = !isEdit;
			});
		}

		function startEdit(isEdit) {
			vm.originalEstimateForm = angular.copy(vm.estimateForm);
			return isEdit = !isEdit;
		}

		function cancelEdit(isEdit) {
			vm.estimateForm = vm.originalEstimateForm;
			vm.originalEstimateForm = [];
			return isEdit = !isEdit;
		}

		function remove(itemId) {
			var deleteItem = $window.confirm('Are you sure you want to delete?');
			if (deleteItem) {
				bookService.item.remove({
					itemId: itemId
				}, function () {
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
				vm.form = {
					ids: []
				};
				$state.go('book');
			});
		}
	}
}());
(function () {
	angular.module('glorem').directive('checklistModel', CheckListModel);

	CheckListModel.$inject = ['$parse', '$compile'];

	function CheckListModel($parse, $compile) {
		var check = this;
		check.add = add;
		check.contains = contains;
		check.remove = remove;
		check.postLinkFn = postLinkFn;

		// contains
		function contains(arr, item, comparator) {
			if (angular.isArray(arr)) {
				for (var i = arr.length; i--;) {
					if (comparator(arr[i], item)) {
						return true;
					}
				}
			}
			return false;
		}

		// add
		function add(arr, item, comparator) {
			arr = angular.isArray(arr) ? arr : [];
			if (!contains(arr, item, comparator)) {
				arr.push(item);
			}
			return arr;
		}

		// remove
		function remove(arr, item, comparator) {
			if (angular.isArray(arr)) {
				for (var i = arr.length; i--;) {
					if (comparator(arr[i], item)) {
						arr.splice(i, 1);
						break;
					}
				}
			}
			return arr;
		}

		// http://stackoverflow.com/a/19228302/1458162
		function postLinkFn(scope, elem, attrs) {
			// exclude recursion, but still keep the model
			var checklistModel = attrs.checklistModel;
			attrs.$set('checklistModel', null);
			// compile with `ng-model` pointing to `checked`
			$compile(elem)(scope);
			attrs.$set('checklistModel', checklistModel);

			// getter / setter for original model
			var getter = $parse(checklistModel);
			var setter = getter.assign;
			var checklistChange = $parse(attrs.checklistChange);

			// value added to list
			var value = attrs.checklistValue ? $parse(attrs.checklistValue)(scope.$parent) : attrs.value;


			var comparator = angular.equals;

			if (attrs.hasOwnProperty('checklistComparator')) {
				if (attrs.checklistComparator[0] == '.') {
					var comparatorExpression = attrs.checklistComparator.substring(1);
					comparator = function (a, b) {
						return a[comparatorExpression] === b[comparatorExpression];
					};

				} else {
					comparator = $parse(attrs.checklistComparator)(scope.$parent);
				}
			}

			// watch UI checked change
			scope.$watch(attrs.ngModel, function (newValue, oldValue) {
				if (newValue === oldValue) {
					return;
				}
				var current = getter(scope.$parent);
				if (angular.isFunction(setter)) {
					if (newValue === true) {
						setter(scope.$parent, add(current, value, comparator));
					} else {
						setter(scope.$parent, remove(current, value, comparator));
					}
				}

				if (checklistChange) {
					checklistChange(scope);
				}
			});

			// declare one function to be used for both $watch functions
			function setChecked(newArr) {
				scope[attrs.ngModel] = contains(newArr, value, comparator);
			}

			// watch original model change
			// use the faster $watchCollection method if it's available
			if (angular.isFunction(scope.$parent.$watchCollection)) {
				scope.$parent.$watchCollection(checklistModel, setChecked);
			} else {
				scope.$parent.$watch(checklistModel, setChecked, true);
			}
		}

		return {
			restrict: 'A',
			priority: 1000,
			terminal: true,
			scope: true,
			compile: function (tElement, tAttrs) {
				if ((tElement[0].tagName !== 'INPUT' || tAttrs.type !== 'checkbox')
					&& (tElement[0].tagName !== 'MD-CHECKBOX')
					&& (!tAttrs.btnCheckbox)) {
					throw 'checklist-model should be applied to `input[type="checkbox"]` or `md-checkbox`.';
				}

				if (!tAttrs.checklistValue && !tAttrs.value) {
					throw 'You should provide `value` or `checklist-value`.';
				}

				// by default ngModel is 'checked', so we set it if not specified
				if (!tAttrs.ngModel) {
					// local scope var storing individual checkbox model
					tAttrs.$set('ngModel', 'checked');
				}

				return postLinkFn;
			}
		};
	}
} ());
(function () {
    angular.module('services').factory('archiveService', archiveService);

    archiveService.$inject = ['$resource'];

    function archiveService($resource) {
        return {
            getCustomer: $resource('/customers/deactivate', {}, {
                'get': {
                    method: 'GET',
                    isArray: true
                }
            }),
            customer: $resource('/customers/:id', {
                id: '@id'
            }, {
                'remove': {
                    method: 'DELETE'
                }
            }),
            customerUpdate: $resource('/customers', {}, {
                'update': {
                    method: 'PUT'
                }
            })
        };
    }

}());
(function () {
    'use strict';

    angular.module('glorem').config(archiveRoute);

    archiveRoute.$inject = ['$stateProvider'];

    function archiveRoute($stateProvider) {
        $stateProvider.state('archiveEstimate', {
            parent: 'site',
            url: '/archiveEstimate',
            data: {
                roles: ['ROLE_ADMIN']
            },
            templateUrl: '/resources/components/archiveEstimate/archiveEstimate.tpl.html',
            controller: 'ArchiveEstimateController',
            controllerAs: 'vm'
        });
    }
} ());
(function () {
    'use strict';

    angular
        .module('glorem')
        .controller('ArchiveEstimateController', ArchiveEstimaterController);

    ArchiveEstimaterController.inject = ['archiveService', '$window'];

    function ArchiveEstimaterController(archiveService, $window) {
        var vm = this;
        vm.navBar = '/resources/components/share/navBar.html';
        vm.estimates = [];
        vm.restoreEstimate = restoreEstimate;
        vm.remove = remove;

        activate();

        return vm;
        ////////////////

        function activate() {
            archiveService.getCustomer.get().$promise.then(function (data) {
                vm.estimates = data;
            });
        }

        function restoreEstimate(customer) {
            customer.active = true;
            customer.status = 'CR';
            archiveService.customerUpdate.update(customer).$promise.then(function () {
                activate();
            });
        }

        function remove(estimate) {
            var deleteCustomer = $window.confirm('Are you shure you want to delete ' + estimate.name + ' ' + estimate.lastName + ' estimate');
            if (deleteCustomer) {
                archiveService.customer.remove(estimate).$promise.then(function () {
                    activate();
                });
            }
        }
    }
})();
(function(){
	angular
	.module('glorem')
	.factory('adminService', adminService);

	adminService.$inject = ['$http','$rootScope','$resource'];
	
	function adminService($http, $rootScope, $resource){
		return {
			getChapterList : $resource('/chapters',{},{
				'get':{method:'GET', isArray:true}
			}),
			getUnits : $resource('/units',{},{
				'get':{method:'GET', isArray:true}
			}),
			saveChaps: $resource('/chapters',{},{
				'save':{method:'POST'}
			})
		};
	}
	
}());
(function () {
    'use strict';

    angular.module('glorem').config(adminRoute);

    adminRoute.$inject = ['$stateProvider'];

    function adminRoute($stateProvider) {
        
        $stateProvider.state('afterAuth', {
            parent: 'site',
            url: '/afterAuth',
            data: {
                roles: ['ROLE_ADMIN']
            },
            templateUrl: '/resources/components/admin/admin.tpl.html',
            controller: 'AdminController',
            controllerAs: 'vm'
        });
        
    }
})();
(function () {
	angular
		.module('glorem')
		.controller('AdminController', AdminController);

		AdminController.$ingect = []; 
		
		function AdminController() {
			var vm = this;
			vm.navBar =  '/resources/components/share/navBar.html';
			return vm;
		}
} ());
angular.module('glorem').run(['$templateCache', function($templateCache) {$templateCache.put('/resources/components/admin/admin.tpl.html','<div data-ng-include=vm.navBar></div><div class=container><center><h1>Admin Page</h1></center><p>Test server</p></div>');
$templateCache.put('/resources/components/archiveEstimate/archiveEstimate.tpl.html','<div data-ng-include=vm.navBar></div><div class=container><center><h1>Archive estimates</h1></center><hr class=col-lg-12><table class=table><tr><td class="hdr type"><em><strong>TYPE</strong></em></td><td class=hdr><em><strong>DATE</strong></em></td><td class="hdr address"><em><strong>ADDRESS</strong></em></td><td class=hdr><em><strong>CUSTOMER NAME</strong></em></td><td class=hdr><em><strong>PHONE</strong></em></td><td class=hdr><em><strong>EMAIL</strong></em></td><td class=hdr><em><strong>STATUS</strong></em></td><td class=hdr><em><strong>EDIT</strong></em></td><td class=hdr><em><strong>RESTORE</strong></em></td><td class=hdr><em><strong>DEL</strong></em></td></tr><tr><td colspan=10 style="height: 6px; background-color: #9B3A38"></td></tr><tr data-ng-repeat="estimate in vm.estimates | orderBy:\'-date\'" uib-popover="Grand Total: ${{estimate.customerGrandTotal}}" popover-trigger="\'mouseenter\'"><td><strong>{{estimate.typeEstimate}}</strong></td><td><strong>{{estimate.date}}</strong></td><td>{{estimate.address}}</td><td>{{estimate.name}} {{estimate.lastName}}</td><td>{{estimate.phoneNumber}}</td><td>{{estimate.email}}</td><td align=center ng-class="{\'estDec\': estimate.status==\'ED\', \'estAgr\': estimate.status==\'EA\',\'estMod\': estimate.status==\'ECM\'}"><strong>{{estimate.status}}</strong></td><td style="text-align: center"><a class="btn btn-sm btn-warning" ui-sref="editEstimate({id: estimate.id})"><i class="fa fa-edit"></i></a></td><td style="text-align: center"><a class="btn btn-sm btn-primary" ng-click=vm.restoreEstimate(estimate)><i class="fa fa-undo"></i></a></td><td style="text-align: center"><a class="btn btn-sm btn-danger" ng-click=vm.remove(estimate)><i class="fa fa-trash"></i></a></td></tr></table></div>');
$templateCache.put('/resources/components/book/book.tpl.html','<div data-ng-include=vm.navBar></div><div class=container><div class=row><div class="col-lg-6 form-group"><input type=text class=form-control data-ng-model=vm.form.name placeholder="Enter form name"></div><div class="col-lg-6 form-grou"><button class="btn btn-primary" data-ng-click=vm.createSchema() data-ng-show="vm.form.ids.length!=0">Save form for estimate</button></div></div><hr class=col-sm-12><br><center><h1>Estimate book</h1></center><table class=table><tr><td class="description hdr"><em><strong>Work description</strong></em></td><td class="amount hdr"><em><strong>Amount</strong></em></td><td class="price hdr"><em><strong>Price</strong></em></td><td class="unit hdr"><em><strong>Unit</strong></em></td><td class="minimum hdr"><em><strong>Minimum charge</strong></em></td><td class="total hdr"><em><strong>Total</strong></em></td><td class="but hdr"></td><td class=hdr></td></tr><tr><td colspan=8 class=red-line></td></tr></table><table class=table data-ng-repeat="chapter in vm.estimateForm track by $index"><tr class=chapter-header><th colspan=8>{{chapter.chapterName}}</th></tr><tr data-ng-repeat="item in chapter.tjList track by $index"><td class=description data-ng-show=!isEdit>{{$index + 1}}. {{item.workDescription}} <button data-ng-click="isEdit=vm.startEdit(isEdit)" class=pull-right><i class="fa fa-edit"></i></button></td><td class=description data-ng-show=isEdit>{{$index + 1}}. <input type=text ng-model=item.workDescription> <button class="mybutton pull-right" ng-click="isEdit = vm.cancelEdit(isEdit)"><i class="fa fa-remove"></i></button> <button class="mybutton pull-right" ng-click="isEdit = vm.updateItem(item,isEdit)"><i class="fa fa-save"></i></button></td><td class=amount><input type=text data-ng-model=item.amount></td><td class=price align=right data-ng-show=!isEdit>${{item.price}}</td><td class=price align=right data-ng-show=isEdit><input type=text ng-model=item.price></td><td class=unit data-ng-show=!isEdit>{{item.unitName}}</td><td class=unit data-ng-show=isEdit><select ng-options="unit.name as unit.name for unit in vm.units" ng-model=item.unitName></select></td><td class=minimum align=right data-ng-show=!isEdit>${{item.minimumCharge}}</td><td class=minimum align=right data-ng-show=isEdit><input type=text ng-model=item.minimumCharge></td><td class=total>${{item.amount*item.price}}</td><td class=but><button class="btn btn-danger" data-ng-click=vm.remove(item.id)><i class="fa fa-trash"></i></button></td><td><div class=squaredOne><input type=checkbox value=None id={{item.id}}{{$index}} name=check checklist-model=vm.form.ids checklist-value=item.id> <label for={{item.id}}{{$index}}></label></div></td></tr></table></div>');
$templateCache.put('/resources/components/chapter/chapter.tpl.html','<div data-ng-include=vm.navBar></div><div class=container><center><h1>Chapter creater</h1></center><table class=table><tr><th class=chapter-header>New chapters</th><th class=chapter-header>Existing chapters</th></tr><tr><td class="well chapter-create-col"><button class="btn btn-primary" ng-click=vm.add()>Add chapter</button><div data-ng-repeat="chapter in vm.chapters track by $index"><div class=form-inline><input type=text class=form-control ng-model=chapter.name>&nbsp; <button class="btn btn-danger" ng-click=vm.remove($index)><i class="fa fa-trash"></i></button></div></div></td><td class="well chapter-create-col"><div data-ng-repeat="chap in vm.chaps"><a ng-click=vm.update(chap)>{{chap.name}}</a> <span style="float: right">&nbsp; <button class="btn btn-danger btn-xs" ng-click=vm.deleteDB(chap.id)><i class="fa fa-trash"></i></button></span></div></td></tr></table><button class="btn btn-success col-lg-offset-3" data-ng-click=vm.save()>Save</button><div id=msg class=white_content><div class=col-lg-7><input type=text class=form-control ng-model=vm.chapter.name></div><button class="btn btn-sm btn-success" ng-click=vm.upd(vm.chapter)>Rename</button> <button class="btn btn-sm btn-primary" ng-click=vm.close()>Close</button></div><div id=fade class=black_overlay></div></div>');
$templateCache.put('/resources/components/createEstimate/createEstimate.tpl.html','<div data-ng-include=vm.navBar></div><div class=container><hr class=col-lg-12><div><p class=instructions><span class=instructions-number>1</span> Select customer name from drop down below. If you did not see his/her name go to next step.</p></div><form class=form-inline><div class=customer-selection><label for=customers>Select customer:</label><select class=form-control ng-options="customer.name+\' \'+customer.lastName for customer in vm.customers" data-ng-model=vm.customer id=customers></select></div></form><hr class=col-lg-12><div><p class=instructions><span class=instructions-number>2</span> If you did not see his/her name in the drop down start create new customer in this section.</p></div><div class=col-md-12><form name=myForm novalidate><table class=table><tr><td colspan=3 align=center class=hdr><h4><strong>PROPOSAL</strong></h4></td></tr><tr><td colspan=3 class=red-line></td></tr><tr class=chapter-header><th colspan=3 align=center>Info:</th></tr><tr><td>First name: <input type=text data-ng-model=vm.customer.name name=name required></td><td>Last name: <input type=text data-ng-model=vm.customer.lastName name=lastName required></td><td>Phone number: <input type=text maxlength=13 data-ng-model=vm.customer.phoneNumber required ui-mask="{{\'(999) 999-9999\'}}"></td></tr><tr><td colspan=2>Address: <input type=text size=55 data-ng-model=vm.customer.address required></td><td>Email: <input type=text name=email data-ng-model=vm.customer.email></td></tr><tr><td align=right colspan=2 class=chapter-header>TOTAL PRICE:<br>DISCOUNT:<br>GRAND TOTAL:<br></td><td class=chapter-header>${{vm.customer.customerTotal}}<br><input type=text data-ng-model=vm.customer.customerDiscount><br><div ng-if="customer.Discount==0">${{vm.customer.customerGrandTotal = vm.customer.customerTotal}}</div><div ng-if="customer.Discount!=0">${{vm.customer.customerGrandTotal = vm.customer.customerTotal-vm.customer.customerDiscount}}</div></td></tr><tr><td colspan=3><p>Notes:<br>All building, plumbing, electrical materials and supplies included.<br>Homeowners provide:</p><center><textarea rows=5 cols=135 data-ng-model=vm.customer.notes></textarea></center></td></tr></table></form></div><br><hr class=col-lg-12><div><p class=instructions><span class=instructions-number>3</span> Please do not forget to select type of estimate before saving a customer.</p></div><br><form class=form-inline><div class=customer-selection><label for=estimateTypes>Select type of estimate</label><select id=estimateTypes class=form-control ng-options="type.name as type.name for type in vm.estimateTypes" ng-model=vm.customer.typeEstimate ng-required=true></select><input type=submit class="btn btn-success form-control" data-ng-click=vm.saveCustomer() value="Save customer"> <button class="btn btn-success pull-right" data-ng-click=vm.saveEstimate() ng-disabled="vm.customer.id == null">Save estimate</button></div></form><br><br><hr class=col-lg-12><div><p class=instructions><span class=instructions-number>4</span> Now you are ready to select estimate template and load it from database. Please make sure you have customer selected in a table above, if not go to step 1. At any time you can click "Count chapters" button to see total amount for each chapter and total price in a table above. When you are ready with estimate, you can save estimate by clicking "Save estimate" button. Later you can modify this estimate from Estimates -> Current estimates link on navigation bar.</p></div><form class=form-inline><div class=customer-selection><label for=estimateTypes>Select template:</label><select id=estimateTemplate class=form-control ng-options="s as s for s in vm.schemas" ng-model=vm.name></select><button class="btn btn-primary" data-ng-click=vm.pull(vm.name)>Load Estimate Blank</button> <button class="btn btn-primary pull-right" data-ng-click=vm.count()>Count chapters</button></div></form><hr class=col-lg-12><br><div data-ng-hide="vm.estimateForm.length==null || vm.estimateForm.length==\'\'"><table class=table><tr><td class="description hdr"><em><strong>Work description</strong></em></td><td class="amount hdr"><em><strong>Amount</strong></em></td><td class="price hdr"><em><strong>Price</strong></em></td><td class="unit hdr"><em><strong>Unit</strong></em></td><td class="minimum hdr"><em><strong>Minimum charge</strong></em></td><td class="total hdr"><em><strong>Total</strong></em></td></tr><tr><td colspan=6 style="height: 6px; background-color: #9B3A38"></td></tr></table><form><table class=table data-ng-repeat="chapter in vm.estimateForm"><tr class=chapter-header><th colspan=4><button class="btn btn-default btn-sm" data-ng-click="vm.isCollapsed = !vm.isCollapsed"><i class="glyphicon glyphicon-plus" ng-show=vm.isCollapsed></i> <i class="glyphicon glyphicon-minus" ng-show=!vm.isCollapsed></i></button>{{chapter.chapterName}}</th><th colspan=2>Total: ${{chapter.chapterCount}}</th></tr><tr data-ng-repeat="item in chapter.tjList" collapse=vm.isCollapsed><td class=description>{{$index + 1}}. {{item.workDescription}}</td><td class=amount><input type=text data-ng-model=item.amount></td><td class=price align=right>${{item.price}}</td><td class=unit>{{item.unitName}}</td><td class=minimum align=right>${{item.minimumCharge}}</td><td style="display: none">{{item.total = item.amount*item.price}}</td><td class=total align=right ng-if="item.total==0">{{item.total}}</td><td class=total align=right ng-if="item.total<=item.minimumCharge && item.total!=0">${{item.total=item.minimumCharge}}</td><td class=total align=right ng-if="item.total>item.minimumCharge">${{item.total}}</td><td style="display: none">{{item.customerTotal = item.total}}</td></tr></table></form></div></div>');
$templateCache.put('/resources/components/customerEstimate/customerEstimate.tpl.html','<div class=container><center><h1>Customer estimate</h1></center><div class=notice>Dear <strong>{{vm.customer.name}} {{vm.customer.lastName}}</strong>, you have <strong>60</strong> days from <strong>{{vm.customer.date}}</strong> to Accept this estimate. Otherwise, estimate will expire and you will loose your perfect price and discount.</div><table class=table><tr><td colspan=3 align=center class=hdr><h4><strong>PROPOSAL</strong></h4></td></tr><tr><td colspan=3 style="height: 6px; background-color: #9B3A38"></td></tr><tr class=header><th colspan=3 align=center>Info:</th></tr><tr><td>First name: <strong>{{vm.customer.name}}</strong></td><td>Last name: <strong>{{vm.customer.lastName}}</strong></td><td>Phone number: {{vm.customer.phoneNumber}}</td></tr><tr><td colspan=2>Address: {{vm.customer.address}}</td><td>Email: {{vm.customer.email}}</td></tr><tr><td align=right colspan=2 class=header>TOTAL PRICE:<br>DISCOUNT:<br>GRAND TOTAL:<br></td><td class=header>${{vm.customer.customerTotal}} <span class=customerChange ng-show=vm.modify>/ ${{vm.customer.updCustomerTotal}}</span><br>${{vm.customer.customerDiscount}}<br>${{vm.customer.customerGrandTotal}} <span class=customerChange ng-show=vm.modify>/ ${{vm.customer.updCustomerGrandTotal}}</span></td></tr><tr><td colspan=3><p>Notes:<br>All building, plumbing, electrical materials and supplies included.<br><strong>Homeowners provide:</strong></p>{{vm.customer.notes}}<br><textarea rows=5 cols=100 data-ng-model=customer.updNotes ng-show=vm.modify></textarea></td></tr></table><div class=notice ng-show=vm.modify>You could modify your estimate here. If you have different amount for any item in estimate, just enter numbers in "Customer Amount" and click "RE-COUNT estimate" button to see your changes. When ready click "Submit modifyed estimate".</div><hr class=col-lg-12><div><table class=table><tr><td class="description hdr"><em><strong>Work description</strong></em></td><td class="amount hdr"><em><strong>Amount</strong></em></td><td class="price hdr"><em><strong>Price</strong></em></td><td class="unit hdr"><em><strong>Unit</strong></em></td><td class="minimum hdr"><em><strong>Minimum charge</strong></em></td><td class="total hdr"><em><strong>Total</strong></em></td><td class="customerAmount hdr" ng-show=vm.modify><em><strong>Customer amount</strong></em></td><td class="CustomerTotal hdr" ng-show=vm.modify><em><strong>Customer total</strong></em></td></tr><tr><td colspan=8 style="height: 6px; background-color: #9B3A38"></td></tr></table><form><table class=table data-ng-repeat="chapter in vm.estimateForm"><tr class=header><th colspan=4 style="text-align: left"><button class="btn btn-default btn-sm" data-ng-click="isCollapsed = !isCollapsed"><i class="fa fa-plus" ng-show=isCollapsed></i> <i class="fa fa-minus" ng-show=!isCollapsed></i></button> {{chapter.chapterName}}</th><th class=hdrTotal colspan=2 style="text-align: right">Total: ${{chapter.chapterCount}}</th><th class="hdrTotal customerChange" colspan=2 style="text-align: right" ng-show=vm.modify>Customer total: ${{chapter.chapterCustTotal}}</th></tr><tr data-ng-repeat="item in chapter.tjList" collapse=isCollapsed><td class=description>{{$index + 1}}. {{item.workDescription}}</td><td class=amount>{{item.amount}}</td><td class=price align=right>${{item.price}}</td><td class=unit>{{item.unitName}}</td><td class=minimum align=right>${{item.minimumCharge}}</td><td class=total align=right>${{item.total}}</td><td class="customerAmount customerChange" align=center ng-show=vm.modify><input type=text data-ng-model=item.customerAmount></td><td style="display: none" ng-show=vm.modify>{{item.customerTotal = item.customerAmount*item.price}}</td><td class="customerTotal customerChange" align=right ng-if="item.customerAmount==null || item.customerAmount == \'\'" ng-show=vm.modify>${{item.customerTotal=item.total}}</td><td class="customerTotal customerChange" align=right ng-if="item.customerAmount == 0 && item.customerAmount !=\'\'" ng-show=vm.modify>${{item.customerTotal=0}}</td><td class="customerTotal customerChange" align=right ng-if="item.customerTotal<=item.minimumCharge && item.customerTotal!=0" ng-show=vm.modify>${{item.customerTotal=item.minimumCharge}}</td><td class="customerTotal customerChange" align=right ng-if="item.customerTotal>item.minimumCharge" ng-show=vm.modify>${{item.customerTotal}}</td></tr></table></form></div><div class="form-group col-lg-4"><button class="btn btn-success form-control" data-ng-click=vm.agree(vm.customer) ng-show=!vm.modify>Accept estimate</button> <button class="btn btn-success form-control" data-ng-click=vm.update() ng-show=vm.modify>Submit modifyed estimate</button></div><div class="form-group col-lg-4"><button class="btn btn-danger form-control" data-ng-click=vm.decline(vm.customer) ng-show=!vm.modify>Reject estimate</button> <button class="btn btn-warning form-control" data-ng-click=vm.recount() ng-show=vm.modify>RE-count estimate</button></div><div class="form-group col-lg-4"><button class="btn form-control" data-ng-click="vm.modify=!vm.modify" ng-class="{\'btn-danger\':vm.modify,\'btn-warning\':!vm.modify}"><span ng-show=!vm.modify>Modify estimate</span> <span ng-show=vm.modify>Cancel editing</span></button></div></div>');
$templateCache.put('/resources/components/error/403.tpl.html','error 403 <a href="/">Go to main page</a>');
$templateCache.put('/resources/components/editEstimate/editEstimate.tpl.html','<div data-ng-include=vm.navBar></div><div class=container><center><h1>Modify estimate</h1></center><hr class=col-lg-12><table class=table><tr><td colspan=3 align=center class=hdr><h4><strong>PROPOSAL</strong></h4></td></tr><tr><td colspan=3 style="height: 6px; background-color: #9B3A38"></td></tr><tr class=chapter-header><th colspan=3 align=center>Info:</th></tr><tr><td>First name: <strong>{{vm.customer.name}}</strong></td><td>Last name: {{vm.customer.lastName}}</td><td>Phone number: {{vm.customer.phoneNumber}}</td></tr><tr><td colspan=2>Address: {{vm.customer.address}}</td><td>Email: {{vm.customer.email}}</td></tr><tr><td align=right colspan=2 class=chapter-header>TOTAL PRICE:<br>DISCOUNT:<br>GRAND TOTAL:<br></td><td class=chapter-header>${{vm.customer.customerTotal}} <span class=customerChange ng-show="vm.customer.status==\'ECM\'">/ ${{vm.customer.updCustomerTotal}}</span><br>${{vm.customer.customerDiscount}}<br>${{vm.customer.customerGrandTotal}} <span class=customerChange ng-show="vm.customer.status==\'ECM\'">/ ${{vm.customer.updCustomerGrandTotal}}</span></td></tr><tr><td colspan=3><p>Notes:<br>All building, plumbing, electrical materials and supplies included.<br>Homeowners provide:</p><center><textarea rows=5 cols=135 data-ng-model=vm.customer.notes></textarea></center></td></tr></table><div><table class=table><tr><td class="description hdr"><em><strong>Work description</strong></em></td><td class="amount hdr"><em><strong>Amount</strong></em></td><td class="price hdr"><em><strong>Price</strong></em></td><td class="unit hdr"><em><strong>Unit</strong></em></td><td class="minimum hdr"><em><strong>Minimum charge</strong></em></td><td class="total hdr"><em><strong>Total</strong></em></td><td class="customerAmount hdr" ng-show="vm.customer.status==\'ECM\'"><em><strong>Customer amount</strong></em></td><td class="CustomerTotal hdr" ng-show="vm.customer.status==\'ECM\'"><em><strong>Customer total</strong></em></td></tr><tr><td colspan=8 style="height: 6px; background-color: #9B3A38"></td></tr></table><form><table class=table data-ng-repeat="chapter in vm.estimateForm"><tr class=chapter-header><th colspan=4 style="text-align: left"><button class="btn btn-default btn-sm" data-ng-click="isCollapsed = !isCollapsed"><i class="glyphicon glyphicon-plus" ng-show=isCollapsed></i> <i class="glyphicon glyphicon-minus" ng-show=!isCollapsed></i></button> {{chapter.chapterName}}</th><th class=hdrTotal colspan=2 style="text-align: right">Total: ${{chapter.chapterCount}}</th><th class="hdrTotal customerChange" colspan=2 style="text-align: right" ng-show="vm.customer.status==\'ECM\'">Customer total: ${{chapter.chapterCustTotal}}</th></tr><tr data-ng-repeat="item in chapter.tjList" collapse=isCollapsed><td class=description>{{$index + 1}}. {{item.workDescription}}</td><td class=amount><input type=text data-ng-model=item.amount></td><td class=price align=right>${{item.price}}</td><td class=unit>{{item.unitName}}</td><td class=minimum align=right>${{item.minimumCharge}}</td><td style="display: none">{{item.total = item.amount*item.price}}</td><td class=total align=right ng-if="item.total==0">{{item.total}}</td><td class=total align=right ng-if="item.total<=item.minimumCharge && item.total!=0">${{item.total=item.minimumCharge}}</td><td class=total align=right ng-if="item.total>item.minimumCharge">${{item.total}}</td><td class="customerAmount customerChange" align=center ng-show="vm.customer.status==\'ECM\'">{{item.customerAmount}}</td><td style="display: none" ng-show="vm.customer.status==\'ECM\'">{{item.customerTotal = item.customerAmount*item.price}}</td><td class="customerTotal customerChange" align=right ng-if="item.customerTotal==0" ng-show="vm.customer.status==\'ECM\'">${{item.customerTotal=item.total}}</td><td class="customerTotal customerChange" align=right ng-if="item.customerTotal<=item.minimumCharge && item.customerTotal!=0" ng-show="vm.customer.status==\'ECM\'">${{item.customerTotal=item.minimumCharge}}</td><td class="customerTotal customerChange" align=right ng-if="item.customerTotal>item.minimumCharge" ng-show="vm.customer.status==\'ECM\'">${{item.customerTotal}}</td></tr></table></form></div><div class="form-group col-lg-offset-5"><button class="btn btn-warning form-control" data-ng-click=vm.count()>Re-count estimate</button></div><div class="form-group col-lg-offset-5"><button class="btn btn-success form-control" data-ng-click=vm.updateEstimate()>Update estimate</button></div></div>');
$templateCache.put('/resources/components/estimatesList/estimatesList.tpl.html','<div data-ng-include=vm.navBar></div><div class=container><center><h1>Active estimates</h1></center><hr class=col-lg-12><table class=table><tr><td class="hdr type"><em><strong>TYPE</strong></em></td><td class=hdr><em><strong>DATE</strong></em></td><td class="hdr address"><em><strong>ADDRESS</strong></em></td><td class=hdr><em><strong>CUSTOMER NAME</strong></em></td><td class=hdr><em><strong>PHONE</strong></em></td><td class=hdr><em><strong>EMAIL</strong></em></td><td class=hdr><em><strong>STATUS</strong></em></td><td class=hdr><em><strong>EDIT</strong></em></td><td class=hdr><em><strong>SEND</strong></em></td><td class=hdr><em><strong>DEL</strong></em></td></tr><tr><td colspan=10 style="height: 6px; background-color: #9B3A38"></td></tr><tr data-ng-repeat="estimate in vm.estimates | orderBy:\'-date\'" uib-popover="Grand Total: ${{estimate.customerGrandTotal}}" popover-trigger="\'mouseenter\'"><td><strong>{{estimate.typeEstimate}}</strong></td><td><strong>{{estimate.date}}</strong></td><td>{{estimate.address}}</td><td>{{estimate.name}} {{estimate.lastName}}</td><td>{{estimate.phoneNumber}}</td><td>{{estimate.email}}</td><td align=center ng-class="{\'estDec\': estimate.status==\'ED\', \'estAgr\': estimate.status==\'EA\',\'estMod\': estimate.status==\'ECM\'}"><strong>{{estimate.status}}</strong></td><td style="text-align: center"><a class="btn btn-sm btn-warning" ui-sref="editEstimate({id: estimate.id})"><i class="fa fa-edit"></i></a></td><td style="text-align: center"><a class="btn btn-sm btn-primary" ng-click=vm.sendEstimate(estimate)><i class="fa fa-envelope"></i></a></td><td style="text-align: center"><a class="btn btn-sm btn-danger" ng-click=vm.remove(estimate)><i class="fa fa-trash"></i></a></td></tr></table></div>');
$templateCache.put('/resources/components/item/item.tpl.html','<div data-ng-include=vm.navBar></div><div class=container><center><h1>Item creater</h1></center><div class=col-lg-4><select class=form-control ng-options="chapter.name as chapter.name for chapter in vm.chapters" ng-model=vm.chapter.name></select></div><div class=col-lg-2><button class="btn btn-primary" data-ng-click=vm.createChapter(vm.chapter)>Create</button></div><div class=col-lg-2><button class="btn btn-primary" data-ng-click=vm.save(vm.chaps)>Save</button></div><hr class=col-sm-12><div data-ng-repeat="chap in vm.chaps" style=padding:1px;><br><table><tr><th><h5>{{chap.chapterName}}</h5></th></tr><tr><td><div class=row><div class=col-lg-6><div class=form-group><input type=text class=form-control data-ng-model=chap.workDescription placeholder="Work description"></div></div><div class=col-lg-2><div class=form-group><input type=text class=form-control data-ng-model=chap.price placeholder=Price></div></div><div class=col-lg-2><div class=form-group><select class=form-control ng-options="unit.name as unit.name for unit in vm.units" ng-model=chap.unitName></select></div></div><div class=col-lg-2><div class=form-group><input type=text class=form-control data-ng-model=chap.minimumCharge placeholder="Minimum charge"></div></div></div></td><td><div class="form-group col-lg-2"><button class="btn btn-primary" data-ng-click=vm.add(chap.chapterName)>Add</button></div></td><td><div class="form-group col-lg-2"><button class="btn btn-danger" ng-click=vm.removeFromItem($index)><i class="fa fa-trash"></i></button></div></td></tr></table></div></div>');
$templateCache.put('/resources/components/login/login.tpl.html','<div class=bg><div class=row><div class=text-center><h1>Glorem Projects</h1></div></div><form class=myform autocomplete=off novalidate shake-that><p class=clearfix><label class=customer-label for=login>Enter phone number</label> <input class=customer-phone type=text name=username id=username ng-model=vm.customer ui-mask="{{\'(999) 999-9999\'}}"></p><p class=clearfix><input type=submit name=submit value="Estimate lookup" ng-click=vm.customerLogin(vm.customer)></p></form><p class="text-danger text-center">{{vm.error}}</p><form class=myform autocomplete=off novalidate shake-that><p class=clearfix><label for=login>Username</label> <input type=text name=username id=username placeholder=Username ng-model=vm.user.username></p><p class=clearfix><label for=password>Password</label> <input type=password name=password id=password placeholder=Password ng-model=vm.user.password></p><p class=clearfix><input type=submit name=submit value="Sign in" ng-click=vm.login(vm.user)></p></form><div class="clock-container text-center"><p>{{vm.clock | date:\'mediumTime\'}}</p><p>{{vm.greeting}}</p><div></div></div></div>');
$templateCache.put('/resources/components/templates/templates.tpl.html','<div data-ng-include=vm.navBar></div><div class=container><form class=form-inline><div class=customer-selection><label for=estimateTypes>Select template:</label><select id=estimateTemplate class=form-control ng-options="s as s for s in vm.schemas" ng-model=vm.templateName ng-change=vm.getEstimateForm(vm.templateName)></select></div></form><hr class=col-lg-12><br><div data-ng-hide="vm.estimateForm.length==null || vm.estimateForm.length==\'\'"><form class=form-inline><label for=templateName>Template name:</label> <input id=templateName class=form-control type=text ng-model=vm.templateName> <button class="btn btn-primary" ng-click=vm.updateTemplateName()><i class="fa fa-save"></i> Update template name</button> <button class="btn btn-danger pull-right" ng-click=vm.deleteTemplate(vm.templateName)>Delete template</button></form><table class=table><tr><td class="description hdr"><em><strong>Work description</strong></em></td><td class="amount hdr"><em><strong>Amount</strong></em></td><td class="price hdr"><em><strong>Price</strong></em></td><td class="unit hdr"><em><strong>Unit</strong></em></td><td class="minimum hdr"><em><strong>Minimum charge</strong></em></td><td class="total hdr"><em><strong>Total</strong></em></td></tr><tr><td colspan=6 style="height: 6px; background-color: #9B3A38"></td></tr></table><form><table class=table data-ng-repeat="chapter in vm.estimateForm"><tr class=chapter-header><th colspan=4><button class="btn btn-default btn-sm" data-ng-click="vm.isCollapsed = !vm.isCollapsed"><i class="glyphicon glyphicon-plus" ng-show=vm.isCollapsed></i> <i class="glyphicon glyphicon-minus" ng-show=!vm.isCollapsed></i></button>{{chapter.chapterName}}</th><th colspan=2>Total: ${{chapter.chapterCount}}</th></tr><tr data-ng-repeat="item in chapter.tjList" collapse=vm.isCollapsed><td class=description>{{$index + 1}}. {{item.workDescription}}</td><td class=amount><input type=text data-ng-model=item.amount></td><td class=price align=right>${{item.price}}</td><td class=unit>{{item.unitName}}</td><td class=minimum align=right>${{item.minimumCharge}}</td><td style="display: none">{{item.total = item.amount*item.price}}</td><td class=total align=right ng-if="item.total==0">{{item.total}}</td><td class=total align=right ng-if="item.total<=item.minimumCharge && item.total!=0">${{item.total=item.minimumCharge}}</td><td class=total align=right ng-if="item.total>item.minimumCharge">${{item.total}}</td><td style="display: none">{{item.customerTotal = item.total}}</td></tr></table></form></div></div>');
$templateCache.put('/resources/components/share/navBar.html','<nav class="navbar navbar-default"><div class="container-fluid container"><div class=navbar-header><button type=button class="navbar-toggle collapsed" data-toggle=collapse data-target=#bs-example-navbar-collapse-1 aria-expanded=false><span class=sr-only>Toggle navigation</span> <span class=icon-bar></span> <span class=icon-bar></span> <span class=icon-bar></span></button> <a class=navbar-brand href=#><img ng-src=/img/logo.png alt=Glorem style="width: 35; height: 35;margin-top:-10px"></a></div><div class="collapse navbar-collapse" id=bs-example-navbar-collapse-1><ul class="nav navbar-nav"><li><a href>Projects</a></li><li class=dropdown><a class=dropdown-toggle data-toggle=dropdown role=button aria-haspopup=true aria-expanded=false>Estimates<span class=caret></span></a><ul class=dropdown-menu><li><a ui-sref=createEstimate id=createEstimate>New estimate</a></li><li><a ui-sref=estimates id=estimates>Current estimates</a></li><li><a ui-sref=archiveEstimate>Arhive estimate</a></li></ul></li></ul><ul class="nav navbar-nav navbar-right"><li class=dropdown><a href class=dropdown-toggle data-toggle=dropdown role=button aria-haspopup=true aria-expanded=false>Settings<span class=caret></span></a><ul class=dropdown-menu><li><a ui-sref=book>Estimate Book</a></li><li><a ui-sref=chapter>Chapter settings</a></li><li><a ui-sref=item>Item settings</a></li><li><a ui-sref=templates>Estimate templates</a></li></ul></li><li><a href ng-click=helpers.singout()>Logout</a></li></ul></div></div></nav>');}]);