'use strict';

angular.module('almamediaApp')
    .config(function ($stateProvider) {
        $stateProvider
            .state('home', {
                parent: 'site',
                url: '/',
                data: {
                    roles: []
                },
                views: {
                    'content@': {
                        templateUrl: 'scripts/app/main/main.html',
                        controller: 'MainController'
                    }
                },

                resolve: {
                    marketadData: ['$q', 'MarketadManager', 
                        function ($q, MarketadManager) {
                            var deferred = $q.defer();
                            MarketadManager.getAllMarketad().then(function(data) {
                                deferred.resolve(data);

                            });                            
                            return deferred.promise; 
                        }
                    ]
                }
            });
    });
