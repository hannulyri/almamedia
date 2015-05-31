describe("E2E: addMarketadController.js -", function() {
  	var constants = require('../test-constants.js');

  	var self = this;

	var d = new Date();
	var currentTime = d.toLocaleTimeString("hhmmss").replace(':','').replace(':',''); 	  
	
	var priceInput = '148,00573632';
	var priceOutput = '148,01';
	var marketadUrl;

	describe('addmarketad -', function() {

		it('fetch page', function() {	
			browser.get('#/marketad/add');
			browser.waitForAngular();
			//browser.pause();
		});			

		it('checking if page opens', function() {			
			expect(browser.getLocationAbsUrl()).toBe('/marketad/add');   
		});

		it('title', function() {
			element(by.model('addMarketad.title')).clear().sendKeys('foo');			
			element(by.model('addMarketad.title')).clear();		
			expect(element(by.css('[ng-show="form.title.$error.required"]')).isDisplayed()).toBe(true); 	
			element(by.model('addMarketad.title')).clear().sendKeys('title' + currentTime);			
			expect(element(by.buttonText('Add')).isEnabled()).toBe(false);
		});			

		it('description', function() {
			element(by.model('addMarketad.description')).clear().sendKeys('foo');			
			element(by.model('addMarketad.description')).clear();		
			expect(element(by.css('[ng-show="form.description.$error.required"]')).isDisplayed()).toBe(true); 	
			element(by.model('addMarketad.description')).clear().sendKeys('description' + currentTime);			
			expect(element(by.buttonText('Add')).isEnabled()).toBe(false);
		});	

		it('price', function() {
			element(by.model('tmpPriceCents')).clear().sendKeys('100001');			
			expect(element(by.css('[ng-show="form.priceCents.$error.ngMax"]')).isDisplayed()).toBe(true); 	
			
			element(by.model('tmpPriceCents')).clear().sendKeys('100000');			
			expect(element(by.css('[ng-show="form.priceCents.$error.ngMax"]')).isDisplayed()).toBe(false); 				
			
			element(by.model('tmpPriceCents')).clear().sendKeys('-10');			
			expect(element(by.css('[ng-show="form.priceCents.$error.ngMin"]')).isDisplayed()).toBe(true); 							
			
			element(by.model('tmpPriceCents')).clear().sendKeys('foo');			
			expect(element(by.css('[ng-show="form.priceCents.$error.pattern"]')).isDisplayed()).toBe(true); 				
			
			element(by.model('tmpPriceCents')).clear().sendKeys('123.00573632');			
			expect(element(by.css('[ng-show="form.priceCents.$error.ngMax"]')).isDisplayed()).toBe(false); 	
			expect(element(by.css('[ng-show="form.priceCents.$error.ngMin"]')).isDisplayed()).toBe(false); 							
			expect(element(by.css('[ng-show="form.priceCents.$error.pattern"]')).isDisplayed()).toBe(false); 

			element(by.model('tmpPriceCents')).clear().sendKeys(priceInput);							
			expect(element(by.css('[ng-show="form.priceCents.$error.ngMax"]')).isDisplayed()).toBe(false); 	
			expect(element(by.css('[ng-show="form.priceCents.$error.ngMin"]')).isDisplayed()).toBe(false); 							
			expect(element(by.css('[ng-show="form.priceCents.$error.pattern"]')).isDisplayed()).toBe(false); 

			expect(element(by.buttonText('Add')).isEnabled()).toBe(false);
		});	

		it('email', function() {
			element(by.model('addMarketad.email')).clear().sendKeys('foo');	
			element(by.model('addMarketad.email')).clear();			
			expect(element(by.css('[ng-show="form.email.$error.required"]')).isDisplayed()).toBe(true); 	

			element(by.model('addMarketad.email')).clear().sendKeys('foo');	
			expect(element(by.css('[ng-show="form.email.$error.email"]')).isDisplayed()).toBe(true);			
			
			element(by.model('addMarketad.email')).clear().sendKeys('foo@bar.com');	
			expect(element(by.css('[ng-show="form.email.$error.email"]')).isDisplayed()).toBe(false);	
			expect(element(by.css('[ng-show="form.email.$error.required"]')).isDisplayed()).toBe(false); 			

			expect(element(by.buttonText('Add')).isEnabled()).toBe(false);
		});		

		it('phone', function() {
			element(by.model('addMarketad.phone')).clear().sendKeys('32134654654654');	
			element(by.model('addMarketad.phone')).clear();			
			expect(element(by.css('[ng-show="form.phone.$error.required"]')).isDisplayed()).toBe(true); 	

			element(by.model('addMarketad.phone')).clear().sendKeys('321i3uhi');	
			expect(element(by.css('[ng-show="form.phone.$error.pattern"]')).isDisplayed()).toBe(true);			
			
			expect(element(by.buttonText('Add')).isEnabled()).toBe(false);

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