client = require('selenium-webdriver').remote({
    // Settings
    esiredCapabilities: {
        browserName: 'phantomjs'
    },
    // webdriverjs has a lot of output which is generally useless
    // However, if anything goes wrong, remove this to see more details
    logLevel: 'silent'
});

describe('Test http://www.w3schools.com/', function(){
    before(function(done) {
        client.init().url('http://www.w3schools.com/', done);
    });

    describe('Check homepage', function(){
        it('should see the correct title', function(done) {
            client.getTitle(function(title){
                expect(title).to.have.string('W3Schools Online Web Tutorials');
                done();
            });
        });
    });
    
    after(function(done) {
        client.end();
        done();
    });
});