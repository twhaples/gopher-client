'use strict';
var Server = require('gopher-node');
var assert = require('chai').assert;

var gopher = require('../index.js');
var MenuEntry = require('../lib/menu-entry')

var host = '127.0.0.1';
var port = 7770;

var testApp = Server.createServer(function(req, resp) {
  resp.write(['1Loopback', 'example'].join('\t'));
  resp.write(['', host, port].join('\t'));
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


  describe('getMenu', function() {
    it('should query a host for data', function(done){
      var client = new gopher.Client();
      client.getMenu(host,port,'example', function(error, menu) {
        assert.equal(error, undefined);
        assert.typeOf(menu, 'array');

        var entry = menu[0];
        assert.instanceOf(entry, MenuEntry);
        assert.equal(entry.text(), 'Loopback');
        assert.equal(entry.path(), 'example');
        assert.equal(entry.host(), host);
        assert.equal(entry.port(), port);
        done();
      });
    });

    it('should return the system error when it cannot connect', function(done) {
      var client = new gopher.Client();
      client.getMenu(host,port+1, 'example', function(error, menu) {
        assert.ok(error);
        assert.match(error.message, /connect ECONNREFUSED/);
        assert.deepEqual(menu, []);
        done();
      });
    });
  });
});
