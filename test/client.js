'use strict';
var Gopher = require('../index.js');
var Server = require('gopher-node');
var assert = require('chai').assert;

var host = '127.0.0.1';
var port = 7770;

var testApp = Server.createServer(function(req, resp) {
  resp.write(['0Loopback', 'example', host, port].join('\t'));
  resp.write('\r\n.\r\n');
  resp.end();
});

describe('gopher.client', function() {
  before(function(done) {
    testApp.listen(port, function(error){
      done(error);
    });
  });
  after(function(done) {
    // XXX this is a hack because gopher-node doesn't expose the method
    testApp.netServer.close(done);
  });


  describe("getMenu", function() {
    it("should query a host for data", function(done){
      Gopher.getMenu(host,port,'example', function(error, menu) {
        assert.equal(error, undefined);
        assert.typeOf(menu, 'array');
      
        var entry = menu[0];
        assert.instanceOf(entry, Gopher.MenuEntry);
        assert.equal(entry.text(), 'Loopback');
        assert.equal(entry.path(), 'example');
        assert.equal(entry.host(), host);
        assert.equal(entry.port(), port);
        done();
      });
    });
  });
});

