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