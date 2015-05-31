'use strict';

angular.module('almamediaApp')
    .controller('ViewMarketadController', function ($scope, $translate, viewMarketadData, APPLICATION_URL, MarketadManager, $state, $stateParams, $rootScope) {    	
		function scrollIntoView(eleID) {
		   var e = document.getElementById(eleID);
		   if (!!e && e.scrollIntoView) {
		       e.scrollIntoView();
		   }
		}
		scrollIntoView('wrapper');

		$scope.deleteYesNo = false;
    	$scope.marketad = viewMarketadData;
    	$scope.marketad.description = $scope.marketad.description;
    	$rootScope.lastPosition = $stateParams.pos;



    	if (viewMarketadData.imageUrl) {
	    	var imageId = viewMarketadData.imageUrl;
	    	imageId = imageId.replace(APPLICATION_URL + '/images/', '')
	    	$scope.marketad.imageId = imageId;  
    	}



        $scope.toggleYesNo = function () {
        	$scope.deleteYesNo = $scope.deleteYesNo === false ? true: false
        };
        $scope.delete = function (id) {
            MarketadManager.deleteMarketad(id).then(function () {
                $scope.success = 'OK';
                $state.go('home');
            }).catch(function (response) {            	            	
                $scope.success = null;
                $scope.error = 'ERROR';
            });
        };

    });
