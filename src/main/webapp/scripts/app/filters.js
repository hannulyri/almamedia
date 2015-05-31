'use strict';

angular.module('almamediaApp')
 .filter('nl2br', ['$sanitize', function($sanitize) {
        //var tag = (/xhtml/i).test(document.doctype) ? '<br />' : '<br>';
        var tag = '<br />';
        return function(msg) {
            // ngSanitize's linky filter changes \r and \n to &#10; and &#13; respectively
            msg = (msg + '').replace(/(\r\n|\n\r|\r|\n|&#10;&#13;|&#13;&#10;|&#10;|&#13;)/g, tag + '$1');
            //msg = (msg + '').replace(/(\r\n|\n\r|\r|\n)/g, tag + '$1');
            return $sanitize(msg);
        };
}])
.filter('htmlToPlaintext', function() {
        return function(text) {
          return String(text).replace(/(&nbsp;|<([^>]+)>)/ig, '');
        }
    })
.filter('shortenDesc', function() {        
        return function(str) {
            return str.slice(0,300).trim() + "...";
             
        }
})
.filter('currencyF', function(Math10) {     
     return function(number) {
        console.log(number);
            var numberToReturn;
            var numberToBeDivided = Math10.round10(parseFloat(number/100), -2);
            var numberPieces = String(numberToBeDivided).split('.');
            if (numberPieces.length === 2) {

                if (numberPieces[1].length === 1) {
                    numberToReturn = numberPieces[0] + ',' + numberPieces[1] + '0';    
                } else {
                    numberToReturn = numberPieces[0] + ',' + numberPieces[1];    
                }

            } else {
                numberToReturn =  numberPieces[0] + ',00';    
            }
            return numberToReturn;
        }
})
;