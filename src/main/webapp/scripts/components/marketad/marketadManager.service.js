'use strict';

angular.module('almamediaApp')
    .factory('MarketadManager', function MarketadManager(Marketad) {

     return {
            getAllMarketad: function () {
                return Marketad.query().$promise;
            },
            getMarketad: function (id) {
                return Marketad.get({marketadId:id}).$promise;
            },  
            deleteMarketad: function (id) {
                return Marketad.remove({marketadId:id}).$promise;
            },                      
            addMarketad: function (marketadData, callback) {
                var cb = callback || angular.noop;

                return Marketad.save(marketadData,
                    function () {
                        return cb(marketadData);
                    },
                    function (err) {
                        return cb(err);
                    }.bind(this)).$promise;
            }
        };

    });
