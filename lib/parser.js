var MenuEntry = function(type, text, path, host, port) {
  this.data = {type: type, text: text, path: path, host: host, port: port};
};
MenuEntry.prototype.text = function() { return this.data.text; };
MenuEntry.prototype.path = function() { return this.data.path; };
MenuEntry.prototype.host = function() { return this.data.host; };
MenuEntry.prototype.port = function() { return this.data.port; };

module.exports = {
  MenuEntry: MenuEntry,
};
