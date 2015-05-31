exports.config = {
  baseUrl: 'http://localhost:8080',
  seleniumAddress: 'http://localhost:4444/wd/hub',

  specs: ['e2e/**/*.js'],
  capabilities: {
    'browserName': 'chrome',
    //'phantomjs.binary.path': require('phantomjs').path
  },
  jasmineNodeOpts: {
    showColors: true
  }
}