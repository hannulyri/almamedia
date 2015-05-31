'use strict';

angular.module('almamediaApp')
    .controller('ViewImageController', function ($scope, $translate, $stateParams, APPLICATION_URL, $rootScope) {
    	$rootScope.individualTitle = $stateParams.id;                            
    	$scope.image = APPLICATION_URL + '/images/' + $stateParams.id;
    });
