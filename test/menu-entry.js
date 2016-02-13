'use strict';
var assert = require('chai').assert;
var MenuEntry = require('../lib/menu-entry.js');

describe('MenuEntry', function(){
  describe('constructor', function(){
    it('turns arguments to the right types', function(){
      assert.deepEqual(
        new MenuEntry(1, 'text', 'bloo', 'zzz', '333'),
        new MenuEntry('1', 'text', 'bloo', 'zzz', 333)
      );
    });
  });
  describe('.uri', function(){
    it('should return null for information/error messages', function(){
      assert.equal(new MenuEntry('i', 'text', 'ble', 'blah', 7777).uri(), null);
      assert.equal(new MenuEntry('3', 'text', 'ble', 'blah', 7777).uri(), null);
    });

    it('should return a gopher url for text and menu links', function(){
      assert.equal(new MenuEntry('0', 'more text', 'path', 'server', 7777).uri(),
       'gopher://server:7777/0path');
      assert.equal(new MenuEntry('1', 'more text', 'path', 'server', 70).uri(),
        'gopher://server:70/1path');
    });

    it('should escape spaces and things', function() {
      assert.equal(new MenuEntry('1', 'text', 'path path? path', 'srv', 9).uri(),
        'gopher://srv:9/1path%20path%3F%20path');
    });

    it('should turn URL-annotated links into URLs', function(){
      assert.equal(
        new MenuEntry('h', 'text', 'URL:http://example.com', 'x', 3).uri(),
        'http://example.com'
      );
    });
  });
});
