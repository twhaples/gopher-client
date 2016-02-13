'use strict';
var DirectoryEntry = require('./directory-entry');

var Parser = function () {
  this.isParser = true;
};

var format = /^(\S)([^\t]*)\t([^\t]*)\t([^\t]*)\t([^\t]*)/;
Parser.prototype.parseLine = function (line) {
  var parsed = line.match(format);
  if (parsed) {
    return new DirectoryEntry(parsed[1], parsed[2], parsed[3], parsed[4], parsed[5]);
  }
  return null;
};

module.exports = Parser;
