var assert = require('chai').assert;
var http = require('http');
var OandaRequest = require('../../core/oanda_request');

describe('OandaRequest', function() {

  describe('initialization', function() {
    var request = new OandaRequest(http, {}, {});

    it('should construct correctly', function() {
      assert.equal(request.transport, http);
      assert.ok(request.options);
      assert.ok(request.data);
      assert.ok(request.successFn);
      assert.ok(request.errorFn);
    });
  });

  describe('success', function() {
    var request = new OandaRequest(http, {}, {});

    var successFn = function() { };

    request.success(successFn);

    it('should assign the success function', function() {
      assert.equal(request.successFn, successFn);
    });
  });

  describe('error', function() {
    var request = new OandaRequest(http, {}, {});

    var errorFn = function() { };

    request.error(errorFn);

    it('should assign the error function', function() {
      assert.equal(request.errorFn, errorFn);
    });

  });
});
