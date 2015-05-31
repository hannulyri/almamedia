'use strict';

angular.module('almamediaApp')
    .config(function ($stateProvider) {
        $stateProvider
            .state('viewimage', {
                parent: 'site',
                url: '/image/view/{id}',
                data: {
                    roles: [],
                    pageTitle: 'viewimage.title'
                },
                views: {
                    'content@': {
                        templateUrl: 'scripts/app/image/view/viewImage.html',
                        controller: 'ViewImageController'
                    }
                },
                resolve: {

                }
            });
    });
