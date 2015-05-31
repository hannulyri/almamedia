'use strict';

angular.module('almamediaApp')
    .config(function ($stateProvider) {
        $stateProvider
            .state('pagenotfound', {
                parent: 'site',
                url: '/404',
                data: {
                    roles: [],
                    pageTitle: 'pagenotfound.title'
                },
                views: {
                    'content@': {
                        templateUrl: 'scripts/app/404/pageNotFound.html'
                    }
                },
                resolve: {

                }
            });
    });
