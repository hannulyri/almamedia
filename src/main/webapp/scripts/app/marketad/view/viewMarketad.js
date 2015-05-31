'use strict';

angular.module('almamediaApp')
    .config(function ($stateProvider) {
        $stateProvider
            .state('viewmarketad', {
                parent: 'site',
                url: '/marketad/view/{id}?pos',
                data: {
                    roles: [],
                    pageTitle: 'viewmarketad.title'
                },
                views: {
                    'content@': {
                        templateUrl: 'scripts/app/marketad/view/viewMarketad.html',
                        controller: 'ViewMarketadController'
                    }
                },
                resolve: {
                    viewMarketadData: ['MarketadManager', '$stateParams', '$q', '$rootScope',
                        function (MarketadManager, $stateParams, $q, $rootScope) {
                            var deferred = $q.defer();
                            MarketadManager.getMarketad($stateParams.id).then(function(data) {
                                $rootScope.individualTitle = data.title;
                                data.notFound = false;
                                deferred.resolve(data);
                            }).catch(function(data) {
                                data.notFound = true;
                                $rootScope.pageNotFound = true;
                                deferred.resolve(data);
                            });                            
                            return deferred.promise;                             
                        }
                    ]
                }
            });
    });
