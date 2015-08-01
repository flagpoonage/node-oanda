var assert = require('chai').assert;
var util = require('../../core/oanda_util');

describe('Utilities', function() {
  describe('define', function() {
    it('should return the main parameter if it is defined', function() {
      assert.equal(util.define(false, true), false);
    });

    it('should return the alternative if the input is not defined', function() {
      assert.equal(util.define(undefined, true), true);
    });
  });

  describe('encodeArray', function() {
    it('should throw an error if the parameter is undefined', function() {
      assert.throws(function() { util.encodeArray(); }, TypeError);
    });

    it('should return an encoded comma seperated list if an array is passed in', function() {
      var arr = ['one', 'two', 'three'];

      var result = util.encodeArray(arr);
      assert.equal(result, 'one%2Ctwo%2Cthree');
    });
  });
});
