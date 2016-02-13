'use strict';
var allTypes = require('./directory-entry-types');
var qs = require('querystring');

var DirectoryEntry = function(rawType, text, path, host, port) {
  if (allTypes[rawType].isLink === false) {
    port = host = path = null;
  } else {
    port = parseInt(port);
  }
  this.data = {type: "" + rawType, text: text, path: path, host: host, port: port};
};

DirectoryEntry.prototype.text = function() { return this.data.text; };
DirectoryEntry.prototype.path = function() { return this.data.path; };
DirectoryEntry.prototype.host = function() { return this.data.host; };
DirectoryEntry.prototype.port = function() { return this.data.port; };

var nonGopherLink = /^URL:(.*)/;
DirectoryEntry.prototype.uri = function() {
  if (allTypes[this.data.type].isLink === false) {
    return null;
  }
  if (this.data.type === 'h') {
    var httpLink = this.data.path.match(nonGopherLink);
    if (httpLink) {
      return httpLink[1];
    }
  }
  return 'gopher://' + this.data.host + ':' + this.data.port + '/' +
    this.data.type + qs.escape(this.data.path);
};
module.exports = DirectoryEntry;
