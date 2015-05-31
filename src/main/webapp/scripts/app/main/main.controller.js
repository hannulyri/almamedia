'use strict';

angular.module('almamediaApp')
    .controller('MainController', function ($scope, marketadData, $rootScope) {
    	$scope.marketAds = marketadData;

		function scrollIntoView(eleID) {
		   var e = document.getElementById(eleID);
		   if (!!e && e.scrollIntoView) {
		       e.scrollIntoView();
		   }
		}

	    $scope.$on('onRepeatLast', function(scope, element, attrs){
	    		if ($rootScope.lastPosition) {
	          		scrollIntoView('ad' + $rootScope.lastPosition);
	          		$rootScope.lastPosition = undefined;
	      		}
	    });			
    });
