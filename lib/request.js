'use strict';

var util = require('util');
var net = require('net');
var EventEmitter = require('events');

var Request = function (host, port, path) {
  this.host = host;
  this.port = port;
  this.path = path;

  this.socket = null;
};
util.inherits(Request, EventEmitter);

Request.prototype.getResource = function () {
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

module.exports = Request;
