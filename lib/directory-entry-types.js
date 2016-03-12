'use strict';

var Type = function (opts) {
  opts = opts || {};
  this.isGopher = opts.isGopher === undefined ? true : opts.isGopher;
  this.isLink = opts.isLink === undefined ? true : opts.isLink;
  this.query = opts.query || false;
  this.isText = opts.isText || false;
};

// TODO: find a better pattern for this
module.exports = {
  0: new Type({isText: true}),
  1: new Type(),
  2: new Type({isGopher: false, query: true}),
  3: new Type({isLink: false, isGopher: false}),
  4: new Type({isText: true}),
  5: new Type(),
  6: new Type({isText: true}),
  7: new Type({query: true}),
  8: new Type({isGopher: false}),
  9: new Type(),
  g: new Type(),
  h: new Type(),
  i: new Type({isLink: false, isGopher: false}),
  I: new Type(),
  s: new Type(),
  T: new Type({isGopher: false})
};
