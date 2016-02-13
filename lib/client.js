'use strict';
var Request = require('./request');
var DirectoryRequest = require('./directory-request');

var Client = function () {
};

Client.prototype.getResource = function (host, port, path, callback) {
  var req = new Request(host, port, path);
  req.on('connect', function (socket) { callback(undefined, socket); });
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

module.exports = Client;
