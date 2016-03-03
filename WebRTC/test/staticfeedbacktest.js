var webdriverio = require('webdriverio');
var should = require('should');
var options = {
    desiredCapabilities: {
        browserName: 'firefox'
    }
};
 
describe('Index page', function() {
var s;
var x=webdriverio
    .remote(options);
    x.init()
    .url('https://localhost:8000/').then(function (status){
        console.log(status);
    });
  //this.timeout = 99999999;

  it('should open chat application', function(status) {
      
      /*var title= x.getTitle();
      
      title.should.matchAny('Coderdojo Communication');
      console.log(title);
      */
      //done();
      var e=1+1;
      status.should.equal(5);
      done();
    });
    x.end();
    
});