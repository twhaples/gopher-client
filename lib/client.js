'use strict';
var net = require('net');
var carrier = require('carrier');
var Parser = require('./parser');

var Client = function(options){
  this.parser = new Parser();
};

// TODO: make this splittable (turn into object)
Client.prototype.getMenu = function(host, port, path, callback) {
  var socket = net.createConnection(
    {host: host, port: port}
  );

  var menu = [];
  var onLine = function(line) {
    if (line === '.') {
      callback(undefined, menu);
      socket.close();
    }
    var entry = this.parser.parseLine(line);
    if (entry) {
      menu.push(entry);
    } else {
      // TODO: test this
      callback(new Error('Parse error'), menu);
    }
  }.bind(this);

  socket.on('connect', function onConnect() {
    socket.write(path);
    socket.write('\r\n');
    carrier.carry(socket, onLine);
  }.bind(this));

  socket.on('error', function(error) {
    // todo: test
    callback(error, menu);
  });

  // todo: what if server disconnects prematurely?
  // todo: what if server hangs forever?
};

module.exports = Client;
