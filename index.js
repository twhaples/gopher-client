'use strict';
var Client = require('./lib/client');
var parser = require('./lib/parser');

module.exports = {
  Menu: parser.Menu,
  MenuEntry: parser.MenuEntry,
  Client: Client,
};
