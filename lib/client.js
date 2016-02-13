'use strict';
var net = require('net');
var util = require('util');
var EventEmitter = require('events');

var carrier = require('carrier');
var Parser = require('./parser');

var Client = function () {
};

var Request = function (host, port, path) {
  this.host = host;
  this.port = port;
  this.path = path;

  this.socket = null;
};
util.inherits(Request, EventEmitter);

var DirectoryRequest = function(host, port, path) {
  Request.call(this, host, port, path);
  this.directory = [];
  this.parser = new Parser();
}

util.inherits(DirectoryRequest, Request);

Client.prototype.getResource = function (host, port, path, callback) {
  var req = new Request(host, port, path);
  req.on('connect', function (socket) { callback(undefined, socket) });
  req.on('error', callback); // TODO test

  req.getResource();
};

Client.prototype.getDirectory = function (host, port, path, callback) {
  var req = new DirectoryRequest(host, port, path);
  req.on('directory', function () {
    callback(undefined, req.directory);
  });
  req.on('error', function (error) {
    callback(error, req.directory);
  });
  req.on('directoryError', function (error) {
    this.socket.close();
    callback(error, req.directory);
  });

  req.getResource();
};

Request.prototype.getResource = function() {
  this.socket = net.createConnection({host: this.host, port: this.port});
  this.socket.on('connect', this.onSocketConnect.bind(this));
  this.socket.on('error', function (error) {
    this.emit('error', error);
  }.bind(this));
};

Request.prototype.onSocketConnect = function () {
  this.socket.write(this.path);
  this.socket.write('\r\n');
  this.onConnect();
};

Request.prototype.onConnect = function () {
  this.emit('connect', this.socket);
  return;
};

DirectoryRequest.prototype.onConnect = function () {
  this.constructor.super_.prototype.onConnect.call(this);
  carrier.carry(this.socket, function (line) {
    if (line === '.') {
      this.emit('directory');
      this.socket.close();
    }
    var entry = this.parser.parseLine(line);
    if (entry) {
      this.directory.push(entry);
    } else {
      // TODO: test this
      this.emit('directoryError', new Error('Directory entry parse error'));
    }
  }.bind(this));
};

module.exports = Client;
