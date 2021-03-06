'use strict';

var util = require('util');
var carrier = require('carrier');

var Parser = require('./parser');
var Request = require('./request');

var DirectoryRequest = function(host, port, path) {
  Request.call(this, host, port, path);
  this.directory = [];
  this.parser = new Parser();
};

util.inherits(DirectoryRequest, Request);

DirectoryRequest.prototype.onConnect = function () {
  this.constructor.super_.prototype.onConnect.call(this);
  carrier.carry(this.socket, function (line) {
    if (line === '.') {
      this.emit('directory');
      this.socket.destroy();
      return;
    }
    var entry = this.parser.parseLine(line);
    if (entry) {
      this.directory.push(entry);
    } else {
      // TODO: test this
      var error = new Error('Directory entry parse error');
      this.emit('directoryError', error);
    }
  }.bind(this));
};

module.exports = DirectoryRequest;
