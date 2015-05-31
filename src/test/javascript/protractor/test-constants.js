(function(){

var TestConstants = function() {
    this.USERLOGIN = 'user';
    this.USERPASSWORD = 'user';
    this.TESTUSER = 'testuser';
};

  // get the instance you want to export
  var constants = new TestConstants();

  // if module.export is available ( NodeJS? ) go for it,
  // otherwise append it to the global object
  if (module && module.exports) {
    module.exports = constants;
  } else {
    window.constants = constants;
  }

})();