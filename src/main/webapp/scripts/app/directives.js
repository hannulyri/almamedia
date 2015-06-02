'use strict';

angular.module('almamediaApp')
.directive('onLastRepeat', function() {
    return function(scope, element, attrs) {
        if (scope.$last) setTimeout(function(){
            scope.$emit('onRepeatLast', element, attrs);
        }, 1);
    };
})
.directive('ngMax', function(Math10) {
    return {
        restrict: 'A',
        require: 'ngModel',
        link: function(scope, elem, attr, ctrl) {
            scope.$watch(attr.ngMax, function(){
                ctrl.$setViewValue(ctrl.$viewValue);
            });
            var maxValidator = function(value) {
            	if (value === undefined)
            		return;
				var max = attr.ngMax;

				var tmpValue = String(value);
				var fixedValue = tmpValue.replace('/[,]/g','.');
				fixedValue = Math10.round10(parseFloat(fixedValue), -2);
				//console.log('max ' + fixedValue + ' : ' + max);

				if (fixedValue > max) {
				ctrl.$setValidity('ngMax', false);
				return undefined;
				} else {
				ctrl.$setValidity('ngMax', true);
				return value;
				}
            };

            ctrl.$parsers.push(maxValidator);
            ctrl.$formatters.push(maxValidator);
        }
    };
})
.directive('ngMin', function(Math10) {
    return {
        restrict: 'A',
        require: 'ngModel',
        link: function (scope, elem, attr, ctrl) {
            scope.$watch(attr.ngMin, function () {
                ctrl.$setViewValue(ctrl.$viewValue);
            });
            var minValidator = function (value) {
            	if (value === undefined)
            		return;
				var min = attr.ngMin;

				var tmpValue = String(value);
				var fixedValue = tmpValue.replace('/[,]/g','.');
				fixedValue = Math10.round10(parseFloat(fixedValue), -2);
				//console.log('min ' + fixedValue + ' : ' + min);

                if (fixedValue < min) {
                    ctrl.$setValidity('ngMin', false);
                    return undefined;
                } else {
                    ctrl.$setValidity('ngMin', true);
                    return value;
                }
            };

            ctrl.$parsers.push(minValidator);
            ctrl.$formatters.push(minValidator);
        }
    };
})
.directive('allowedNumber', function(Math10) {
    return {
        restrict: 'A',
        require: 'ngModel',
        link: function (scope, elem, attr, ctrl) {

            var allowedNumberValidator = function (value) {
                if (value === undefined)
                    return;
                value = value.trim();                
                var regex = /^[0-9]+([\.|\,][0-9]?[0-9]?)?$/g;
                
                if (value.match(regex)) {
                    ctrl.$setValidity('allowednumber', true);
                    return value;                    
                } else {
                    ctrl.$setValidity('allowednumber', false);
                    return undefined;
                }                

            };

            ctrl.$parsers.push(allowedNumberValidator);
            ctrl.$formatters.push(allowedNumberValidator);
        }
    };
})
;