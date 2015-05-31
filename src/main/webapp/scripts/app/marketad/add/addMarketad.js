'use strict';

angular.module('almamediaApp')
    .config(function ($stateProvider) {
        $stateProvider
            .state('addmarketad', {
                parent: 'site',
                url: '/marketad/add',
                data: {
                    roles: [],
                    pageTitle: 'addmarketad.title'
                },
                views: {
                    'content@': {
                        templateUrl: 'scripts/app/marketad/add/addMarketad.html',
                        controller: 'AddMarketadController'
                    }
                }
            });
    });
