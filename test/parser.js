'use strict';
var assert = require('chai').assert;
var Parser = require('../lib/parser');
var DirectoryEntry = require('../lib/directory-entry');

describe('Parser', function () {
  describe('.parseLine', function () {
    describe('on an ordinary Directory line', function () {
      var parsed;
      before(function () {
        parsed = new Parser().parseLine('1Hello!\ttest\texample.net\t7070');
      });

      it('should return a DirectoryEntry item', function () {
        assert.deepEqual(
          parsed,
          new DirectoryEntry('1', 'Hello!', 'test', 'example.net', 7070)
        );
      });

      it('should get .text() right', function () {
        assert.equal(parsed.text(), 'Hello!');
      });

      it('should get .uri() right', function () {
        assert.equal(parsed.uri(), 'gopher://example.net:7070/1test');
      });
    });

    it('can parse informational lines (with dummy links)', function () {
      var parsed = new Parser().parseLine('iinfo\tfake\t(null))\t0\tgopher+++');
      assert.deepEqual(parsed, new DirectoryEntry('i', 'info', null, null, null));
    });

    it('can parse textfile links', function () {
      var parsed = new Parser().parseLine(
        '0The good stuff!\tgoodstuff.txt\texample.org\t70'
      );
      assert.deepEqual(
        parsed,
        new DirectoryEntry('0', 'The good stuff!', 'goodstuff.txt', 'example.org', 70)
      );
    });

    it('should ignore extra data at the end', function () {
      var parsed = new Parser().parseLine('1x\ty\texample.net\t70\tgopher+++');
      assert.deepEqual(parsed, new DirectoryEntry('1', 'x', 'y', 'example.net', 70));
    });

    describe('on unparseable lines', function () {
      var parse = function (line) { return new Parser().parseLine(line); };
      it('should return null when something cannot be parsed', function () {
        assert.equal(parse(''), null, 'the empty string');
        assert.equal(parse('.'), null, 'the dot at the end of a gopher list');
        assert.equal(parse('0hello\tworld'), null, 'a line that is too short');
      });
    });
  });
});
