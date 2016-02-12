'use strict';

var MenuEntry = function(type, text, path, host, port) {
  if (type === 'i') {
    port = host = path = null;
  } else {
    port = parseInt(port);
  }
  this.data = {type: type, text: text, path: path, host: host, port: port};
};

MenuEntry.prototype.text = function() { return this.data.text; };
MenuEntry.prototype.path = function() { return this.data.path; };
MenuEntry.prototype.host = function() { return this.data.host; };
MenuEntry.prototype.port = function() { return this.data.port; };

// TODO urlencode on the path
MenuEntry.prototype.uri = function() {
  return 'gopher://' + this.data.host + ':' + this.data.port + '/' +
    this.data.type + this.data.path;
};
module.exports = MenuEntry;
