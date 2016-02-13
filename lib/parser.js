'use strict';
var DirectoryEntry = require('./directory-entry');

var Parser = function(){};

var format = /^(.)([^\t]*)\t([^\t]*)\t([^\t]*)\t([^\t]*)/;
Parser.prototype.parseLine = function(line) {
  var parsed = line.match(format);
  if (parsed) {
    var entry = new DirectoryEntry(parsed[1], parsed[2], parsed[3], parsed[4], parsed[5]);
    return entry;
  } else {
    return null;
  }
};

module.exports = Parser;
