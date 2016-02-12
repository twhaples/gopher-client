'use strict';
var assert = require('chai').assert;
var Parser = require('../lib/parser')
var MenuEntry = require('../lib/menu-entry')

describe('Parser', function(){
  describe('.parseLine', function(){
    describe('on an ordinary menu line', function(){
      var parsed;
      before(function(){
        parsed = new Parser().parseLine('1Hello!\ttest\texample.net\t7070');
      })
      it('should return a MenuEntry item', function(){
        assert.deepEqual(parsed, new MenuEntry(
          '1','Hello!','test','example.net',7070)
        );
      });
      it('should get .text() right', function(){
        assert.equal(parsed.text(), 'Hello!');
      });
      it('should get .uri() right', function() {
        assert.equal(parsed.uri(), 'gopher://example.net:7070/1test');
      });
    });

    it('can parse informational lines (with dummy links)', function(){
      var parsed = new Parser().parseLine('iinfo\tfake\t(null))\t0\tgopher+++');
      assert.deepEqual(parsed, new MenuEntry('i', 'info', null, null, null));
    });

    it('can parse textfile links', function(){
      var parsed = new Parser().parseLine('0The good stuff!\tgoodstuff.txt\texample.org\t70');
      assert.deepEqual(parsed, new MenuEntry(
        '0','The good stuff!','goodstuff.txt','example.org',70));
    });

    it('should ignore extra data at the end', function(){
      var parsed = new Parser().parseLine('1x\ty\texample.net\t70\tgopher+++');
      assert.deepEqual(parsed, new MenuEntry('1','x','y','example.net',70));
    });
  });
});
