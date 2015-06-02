describe("E2E: addMarketadControllerV2.js -", function() {
  	var constants = require('../test-constants.js');

  	var self = this;

	var d = new Date();
	var currentTime = d.toLocaleTimeString("hhmmss").replace(':','').replace(':',''); 	  
	
	var priceInput = ' 6666. ';
	var priceOutput = '6666,00';
	var marketadUrl;

	describe('addmarketad #2 -', function() {

		it('fetch page', function() {	
			browser.get('#/marketad/add');
			browser.waitForAngular();
			//browser.pause();
		});			

		it('checking if page opens', function() {			
			expect(browser.getLocationAbsUrl()).toBe('/marketad/add');   
		});

		it('add ad2', function() {
			element(by.model('addMarketad.title')).clear().sendKeys('title2' + currentTime);			
			expect(element(by.buttonText('Add')).isEnabled()).toBe(false);

			element(by.model('addMarketad.description')).clear().sendKeys('description2' + currentTime);			
			expect(element(by.buttonText('Add')).isEnabled()).toBe(false);

			element(by.model('tmpPriceCents')).clear().sendKeys(priceInput);								
			expect(element(by.css('[ng-show="form.priceCents.$error.allowednumber"]')).isDisplayed()).toBe(false); 

			element(by.model('addMarketad.email')).clear().sendKeys('foo2@bar.com');	
			expect(element(by.css('[ng-show="form.email.$error.email"]')).isDisplayed()).toBe(false);	
			expect(element(by.css('[ng-show="form.email.$error.required"]')).isDisplayed()).toBe(false); 			

			element(by.model('addMarketad.phone')).clear().sendKeys('+358 (0) 400 1234 123');	
			expect(element(by.css('[ng-show="form.phone.$error.pattern"]')).isDisplayed()).toBe(false);			
		
			expect(element(by.buttonText('Add')).isEnabled()).toBe(true);			

			element(by.buttonText('Add')).click();
			browser.waitForAngular();				
		});						
		
	});

	describe('viewmarketad -', function() {

		it('checking if page opens', function() {			
			browser.waitForAngular();
			browser.getLocationAbsUrl().then(function (data) {
				console.log('fetching url');
				self.marketadUrl = data;
				browser.get('#/');
				browser.waitForAngular();
				expect(browser.getLocationAbsUrl()).toBe('/');   

				browser.get('#' + self.marketadUrl);		

			});
			
		});

		it('check price', function() {			
			browser.waitForAngular();
			expect(browser.getLocationAbsUrl()).toBe(self.marketadUrl);   

			expect(element(by.id('marketad-price')).getText()).toEqual(priceOutput);
		});

		it('check delete', function() {					
			expect(element(by.css('[ng-show="deleteYesNo"]')).isDisplayed()).toBe(false);			
			element(by.buttonText('Delete Marketad')).click();
			browser.waitForAngular();
			expect(element(by.css('[ng-show="deleteYesNo"]')).isDisplayed()).toBe(true);			
			element(by.buttonText('Yes')).click();				

		});

		it('check if delete worked', function() {					
			browser.waitForAngular();	
			expect(browser.getLocationAbsUrl()).toBe('/');   

			browser.get('#' + self.marketadUrl);
			browser.waitForAngular();
			expect(browser.getLocationAbsUrl()).toBe(self.marketadUrl);

			expect(element(by.css('.main-heading')).getText()).toEqual('PAGE NOT FOUND');
		});		


	});


});