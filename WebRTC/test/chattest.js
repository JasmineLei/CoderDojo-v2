
var assert = require('assert'),
    //screenshot = require('../public/js/Screenshot'),
    //webdriver = require('selenium-webdriver'),
    webdriverio = require('webdriverio');
    should = require('should');;
var matrix = webdriverio.multiremote({
        mentor: { desiredCapabilities: { browserName: 'chrome' } },
        ninja: { desiredCapabilities: { browserName: 'firefox' } }
    }),
    mentor = matrix.select('mentor'),
    ninja = matrix.select('ninja');

describe('Index page', function() {

  //this.timeout = 99999999;

  it('should open chat application', function() {
        return mentor.init().url('https://localhost:8000/');
    });
 
     // outputs: "Title is: WebdriverIO (Software) at DuckDuckGo"
  it('launch log-in page', function *() {
    var title = yield matrix.getTitle();
    matrix.getTitle().should.equal("Coderdojo Communication Launch Page");
    //done();
  });
 
  it('entry', function() {
    mentor.click('#mentorEntry button');
    ninja.click('#mentorEntry button')
    .then(function() {
        mentor.getUrl().should.matchAny("/sign_in?url=%2FMentor");
        ninja.getUrl().should.matchAny("/sign_in?url=%2FNinjar");
    });
   // done();
  });
    
  it('log-in as mentor', function() {
    mentor.setValue('input[name=email]', 'jj');
    mentor.setValue('input[name=password]', '123')
    
    ninja.setValue('input[name=password]', '123');
    mentor.click('.modal-footer button');
    ninja.click('.modal-footer button').then(function() {
        ninja.getUrl().should.equal("https://localhost:8000/Mentor");
        mentor.getUrl().should.equal("https://localhost:8000/Mentor");
    });  
});

 matrix.end();
});