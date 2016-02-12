'use strict';
var net = require('net');
var carrier = require('carrier');

var parser = require('./parser');

var Client = function(options){};
Client.prototype.getMenu = function(host, port, path, callback) {
  var socket = net.createConnection(
    {host: host, port: port}
  );

  var menu = [];
  socket.on('connect', function() {
    socket.write(path);
    socket.write('\r\n');
    carrier.carry(socket, function(line) {
      if (line == '.') {
        callback(undefined, menu);
        socket.close();
      }
      // todo: extract a line-at-a-time parser and put extensive trests on that
      var format = /^(\d)([^\t]*)\t([^\t]*)\t([^\t]*)\t([^\t]*)/;
      var parsed = line.match(format);
      if (parsed) {
        var entry = new parser.MenuEntry(parsed[1], parsed[2], parsed[3], parsed[4], parsed[5]);
        menu.push(entry);
      } else {
        // todo: test this
        callback(new Error('Parse error'), menu);
      }
    });
  });

  socket.on('error', function(error) {
    // todo: test
    callback(error, menu);
  });
  // todo: what if server disconnects prematurely?
  // todo: what if server hangs forever?
};

module.exports = Client;
