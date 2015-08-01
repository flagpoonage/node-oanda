var assert = require('chai').assert;
var ApiCore = require('../../core/api_core');

var config = {
  token: 'test_token',
  type: 'sandbox',
  dateFormat: 'unix'
};

describe('ApiCore', function() {

  describe('initialization', function() {
    var core = new ApiCore(config);
    it('should construct correctly', function() {
      assert.equal(core.token, 'test_token');
      assert.equal(core.endpoint_type, 'sandbox');
      assert.equal(core.date_time_format, 'UNIX');
    });

    it('should set endpoints correctly', function() {
      assert.equal(core.request_endpoint, 'http://api-sandbox.oanda.com');
      assert.equal(core.stream_endpoint, 'http://stream-sandbox.oanda.com');
    });

    it('should set the date format correctly', function() {
      assert.equal(core.date_time_format, 'UNIX');
    });
  });

  describe('setToken', function() {
    var core = new ApiCore(config);
    core.setToken('new_token');

    it('should set the access token', function() {
      assert.equal(core.token, 'new_token');
    });
  });

  describe('setEndpoint', function() {
    var core = new ApiCore(config);

    core.setEndpoint('real');
    it('should change the endpoint type', function() {
      assert.equal(core.endpoint_type, 'real');
    });

    it('should change the request endpoint', function() {
      assert.equal(core.request_endpoint, 'https://api-fxtrade.oanda.com');
    });

    it('should change the stream endpoint', function() {
      assert.equal(core.stream_endpoint, 'https://stream-fxtrade.oanda.com');
    });
  });

  describe('setDatetimeFormat', function() {
    var core = new ApiCore(config);

    core.setDatetimeFormat('RFC3339');
    it('should change the date time format', function() {
      assert.equal(core.date_time_format, 'RFC3339');
    });
  });

  describe('appendBodyData', function() {
    var core = new ApiCore(config);

    it('should return true for body HTTP methods', function() {
      assert.equal(core.appendBodyData('POST'), true);
      assert.equal(core.appendBodyData('PATCH'), true);
      assert.equal(core.appendBodyData('PUT'), true);
    });

    it('should return false for non-body HTTP methods', function() {
      assert.equal(core.appendBodyData('GET'), false);
      assert.equal(core.appendBodyData('DELETE'), false);
    });
  });

  describe('addAuthorizationHeader', function() {
    var core = new ApiCore(config);

    it('should add the correct authorization header', function() {
      var options = {headers: {}};
      core.addAuthorizationHeader(options);
      assert.equal(options.headers.Authorization, 'Bearer ' + config.token);
    });

  });

  describe('addDateFormatHeader', function() {
    var core = new ApiCore(config);

    it('should add the correct date format header', function() {
      var options = {headers: {}};
      core.addDateFormatHeader(options);
      assert.equal(options.headers['X-Accept-Datetime-Format'], core.date_time_format);
    });
  });
});
