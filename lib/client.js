'use strict';
var net = require('net');
var carrier = require('carrier');
var Parser = require('./parser');

var Client = function () {
  this.parser = new Parser();
};

// TODO: make this splittable (turn into object)
Client.prototype.getDirectory = function (host, port, path, callback) {
  var directory = [];
  var socket = net.createConnection(
    {host: host, port: port}
  );

  var onLine = function (line) {
    if (line === '.') {
      callback(undefined, directory);
      socket.close();
    }
    var entry = this.parser.parseLine(line);
    if (entry) {
      directory.push(entry);
    } else {
      // TODO: test this
      callback(new Error('Parse error'), directory);
    }
  }.bind(this);

  socket.on('connect', function onConnect() {
    socket.write(path);
    socket.write('\r\n');
    carrier.carry(socket, onLine);
  }.bind(this));

  socket.on('error', function (error) {
    // todo: test
    callback(error, directory);
  });

  // todo: what if server disconnects prematurely?
  // todo: what if server hangs forever?
};

module.exports = Client;
