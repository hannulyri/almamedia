'use strict';

angular.module('almamediaApp')
    .factory('Marketad', function ($resource, APPLICATION_URL) {
        return $resource(APPLICATION_URL + '/marketads/:marketadId', {}, {
                'get': {
                    method: 'GET',
                    transformResponse: function (data) {
                        data = angular.fromJson(data);
                        return data;
                    }
                },            
                'post': {
                    method: 'POST',
                    transformResponse: function (data) {
                        data = angular.fromJson(data);
                        return data;
                    }
                }
            });
        });
