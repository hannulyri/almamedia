'use strict';

angular.module('almamediaApp')
    .factory('ImageManager', function ImageManager(Image) {

     return {
            getAllImage: function () {
                return Image.query().$promise;
            },
            getImage: function (id) {
                return Image.get({imageId:id}).$promise;
            },            
            addImage: function (imageData, callback) {
                var cb = callback || angular.noop;

                return Image.save(imageData,
                    function () {
                        return cb(imageData);
                    },
                    function (err) {
                        return cb(err);
                    }.bind(this)).$promise;
            }
        };

    });
