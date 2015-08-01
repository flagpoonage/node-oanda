var assert = require('chai').assert;
var UrlFormatter = require('../../core/url_formatter');

describe('UrlFormatter', function() {

  describe('initialization', function() {
    var f = new UrlFormatter('example.com');

    it('should construct correctly', function() {
      assert.equal(f.base_url, 'example.com/');
      assert.ok(f.params);
    });
  });

  describe('getUrl', function() {

    it('should append the path to the base url', function() {
      var f = new UrlFormatter('example.com');

      assert.equal(f.getUrl('test'), 'example.com/test');
    });

    it('should format inline URL parameters', function() {
      var f = new UrlFormatter('example.com');
      f.setParameters({ test_id: 100 });

      assert.equal(f.getUrl('test/:test_id'), 'example.com/test/100');
    });

    it('should append additional parameters to the querystring', function() {
      var f = new UrlFormatter('example.com');
      f.setParameters({ test_id: 100, other_id: 'hello'});

      assert.equal(f.getUrl('test/:test_id'), 'example.com/test/100?other_id=hello');
    });

    it('should not append additional querystring parameters if a true flag is passed', function() {
      var f = new UrlFormatter('example.com');
      f.setParameters({ test_id: 100, other_id: 'hello'});

      assert.equal(f.getUrl('test/:test_id', true), 'example.com/test/100');
    });

  });

  describe('createPortFromHost', function() {
    it('should return the port number from the host url' ,function() {
      var host = ['example.com', '90'];
      var f = new UrlFormatter();

      assert.equal(f.createPortFromHost(host), 90);
    });

    it('should return the default of the protocol if no port number exists', function() {
      var f = new UrlFormatter();

      assert.equal(f.createPortFromHost([], 'http:'), 80);
      assert.equal(f.createPortFromHost([], 'https:'), 443);
    });
  });

  describe('createPath', function() {
    it('should create a relative path from an array of strings', function() {
      var f = new UrlFormatter();

      assert.equal(f.createPath(['something','else']), '/something/else');
      assert.equal(f.createPath(['something']), '/something');
      assert.equal(f.createPath([]), '/');
    });
  });

  describe('protocolSplit', function() {
    it('should return an array containing the protocol and host', function() {
      var f = new UrlFormatter();

      assert.equal(f.protocolSplit('http://example.com').protocol, 'http:');
      assert.equal(f.protocolSplit('http://example.com:80').continue, 'example.com:80');
    });

    it('should throw an error if an invalid url is supplied', function() {
      var f = new UrlFormatter();

      assert.throws(function() { f.protocolSplit(''); }, f._protocol_split_error);
      assert.throws(function() { f.protocolSplit('http:/example.com'); }, f._protocol_split_error);
      assert.throws(function() { f.protocolSplit('://example.com'); }, f._protocol_split_error);
    });
  });

  describe('removeEmptyStrings', function() {
    it('should remove empty strings from the input array', function() {
      var f = new UrlFormatter();

      var out = f.removeEmptyStrings(['hello', '', ' ', ' something ']);

      assert.equal(out.length, 2);
      assert.equal(out[0], 'hello');
      assert.equal(out[1], 'something');

      var out_2 = f.removeEmptyStrings();

      assert.equal(out_2.length, 0);
    });
  });

  describe('setTrailingSlash', function() {
    it('should return a string with a slash at the end', function() {
      var f = new UrlFormatter();

      assert.equal(f.setTrailingSlash('something'), 'something/');
      assert.equal(f.setTrailingSlash('something/'), 'something/');
      assert.equal(f.setTrailingSlash(''), '/');
      assert.equal(f.setTrailingSlash(), '/');
    });
  });

  describe('getKey', function() {
    it('should remove the first character of a string', function() {
      var f = new UrlFormatter();

      assert.equal(f.getKey(':key'), 'key');
      assert.equal(f.getKey('key'), 'ey');
      assert.throws(f.getKey, TypeError);
    });
  });

  describe('isParameter', function() {
    it('should return whether the value is a parameter (string starting with a colon)', function() {
      var f = new UrlFormatter();

      assert.equal(f.isParameter(':key'), true);
      assert.equal(f.isParameter('key'), false);
      assert.equal(f.isParameter(), false);
    });
  });
});
