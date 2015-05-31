'use strict';

angular.module('almamediaApp')
    .controller('AddMarketadController', function ($scope, $translate, $state, MarketadManager, Math10, Upload, APPLICATION_URL) {
		$scope.files = {};
		$scope.originalImage = null;
		$scope.resizedImage = null;
		$scope.wrongimage = null;
		
	    $scope.$watch('files', function () {
	    	$scope.upload($scope.files);
	    });   

	    $scope.upload = function (files) {
	    	$scope.wrongimage = null;
	        if (files && files.length) {
	            for (var i = 0; i < files.length; i++) {
	                var file = files[i];
    				               
	                Upload.upload({
	                    url: APPLICATION_URL + '/images',
	                    file: file
	                }).progress(function (evt) {
	                    var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
	                    //$scope.log = 'progress: ' + progressPercentage + '% ' + evt.config.file.name + '\n' + $scope.log;
	                }).success(function (data, status, headers, config) {
	                	if (!data.status) {
	                		$scope.wrongimage = true;
	                	}
	                	$scope.originalImage = data.imageUrl;
	                	$scope.resizedImage = data.thumbnailUrl;
	                    //$scope.log = 'file ' + config.file.name + 'uploaded. Response: ' + JSON.stringify(data) + '\n' + $scope.log;
	                    //$scope.$apply();
	                });
	            }
	        }
	    };	     	

        $scope.add = function () {
            $scope.error = null;

            var tmpCents = String($scope.tmpPriceCents);
	        tmpCents = tmpCents.replace(/[,]/g,'.');
			tmpCents = Math10.round10(parseFloat(tmpCents), -2);
			tmpCents = Math10.round10(parseFloat(tmpCents*100), -2);
			$scope.addMarketad.priceCents = tmpCents;

			if ($scope.originalImage) {
				$scope.addMarketad.imageUrl = $scope.originalImage;
			}
			if ($scope.resizedImage) {
				$scope.addMarketad.thumbnailUrl = $scope.resizedImage;
			}			

            MarketadManager.addMarketad($scope.addMarketad).then(function (data) {
                $scope.success = 'OK';
                $state.go('viewmarketad', { id: data.id});
            }).catch(function (response) {            	            	
                $scope.success = null;
                $scope.error = 'ERROR';
            });
        };
    });
