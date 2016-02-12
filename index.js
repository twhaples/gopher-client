'use strict';
var net = require('net');
var carrier = require('carrier'); // TODO: write better tests

var MenuEntry = function(type, text, path, host, port) {
  this.data = {type: type, text: text, path: path, host: host, port: port};
};
MenuEntry.prototype.text = function() { return this.data.text; };
MenuEntry.prototype.path = function() { return this.data.path; };
MenuEntry.prototype.host = function() { return this.data.host; };
MenuEntry.prototype.port = function() { return this.data.port; };

module.exports = {
  MenuEntry: MenuEntry,
  getMenu: function(host, port, path, callback) {
    var socket = net.createConnection(
      {host: host, port: port});

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
          var entry = new MenuEntry(parsed[1], parsed[2], parsed[3], parsed[4], parsed[5]);
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
  }
};
