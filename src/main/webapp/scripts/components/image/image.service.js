'use strict';

angular.module('almamediaApp')
    .factory('Image', function ($resource, APPLICATION_URL) {
        return $resource(APPLICATION_URL + '/images/:imageId', {}, {
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
