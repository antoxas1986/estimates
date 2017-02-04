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