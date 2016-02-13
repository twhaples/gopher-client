'use strict';
var Server = require('gopher-node');
var assert = require('chai').assert;
var getRawBody = require('raw-body');

var gopher = require('../index.js');
var DirectoryEntry = require('../lib/directory-entry');

var host = '127.0.0.1';
var port = 7770;

var testApp = Server.createServer(function (req, resp) {
  if (req.url === 'example') {
    resp.write(['1Loopback', 'example'].join('\t'));
    resp.write(['', host, port].join('\t'));
    resp.write('\r\n.\r\n');
  } else if (req.url === 'file') {
    resp.write("unstructured\ntext");
  }
  resp.end();
});

describe('gopher.client', function () {
  before(function (done) {
    testApp.listen(port, function (error) {
      done(error);
    });
  });

  after(function (done) {
    // XXX this is a hack because gopher-node doesn't expose the method
    testApp.netServer.close(done);
  });

  describe('getDirectory', function () {
    it('should query a host for data', function (done) {
      var client = new gopher.Client();
      client.getDirectory(host, port, 'example', function (error, directory) {
        assert.equal(error, undefined);
        assert.deepEqual(directory, [
          new DirectoryEntry('1', 'Loopback', 'example', host, port)
        ]);
        done();
      });
    });

    it('should return the system error when it cannot connect', function (done) {
      var client = new gopher.Client();
      client.getDirectory(host, port + 1, 'example', function (error, directory) {
        assert.ok(error);
        assert.match(error.message, /connect ECONNREFUSED/);
        assert.deepEqual(directory, []);
        done();
      });
    });
  });


  describe('getResource', function () {
    it('should return a stream', function (done) {
      var client = new gopher.Client();
      client.getResource(host, port, 'file', function (error, stream) {
        assert.equal(error, undefined);
        getRawBody(stream, {}, function (error2, result) {
          assert.equal(error2, undefined);
          assert.equal(result.toString('ascii'), 'unstructured\ntext');
          done();
        });
      });
    });
  });
});
