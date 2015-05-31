describe("E2E: main.controller.js -", function() {
  	var constants = require('../test-constants.js');

	describe('home -', function() {
		it('fetch page', function() {	
			browser.get('#/');
			browser.waitForAngular();
			//browser.pause();
		});			

		it('checking if page opens', function() {			
			expect(browser.getLocationAbsUrl()).toBe('/');  
			expect(element(by.css('.main-heading')).getText()).toEqual('MARKETADS'); 
		});	

		it('checking if language switch works', function() {			
			element(by.css('.dropdown-toggle')).click();
			element(by.id('lang-fi')).click();
			browser.waitForAngular();
			expect(element(by.css('.main-heading')).getText()).toEqual('MAINOKSET'); 		
		});			

		it('switch back', function() {			
			element(by.css('.dropdown-toggle')).click();
			element(by.id('lang-en')).click();
			browser.waitForAngular();
			expect(element(by.css('.main-heading')).getText()).toEqual('MARKETADS'); 		
		});

	});
});
