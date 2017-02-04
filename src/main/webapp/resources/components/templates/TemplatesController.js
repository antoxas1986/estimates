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