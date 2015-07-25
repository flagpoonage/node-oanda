var http = require('http');
var https = require('https');
var OandaRequest = require('./oanda_request');
var UrlFormatter = require('./url_formatter');

var core = function(options) {
  options = typeof options === 'undefined' ? {} : options;

  this.addToken(options.token);
  this.setEndpoint(options.type);
  this.setDatetimeFormat(options.dateFormat);
  this.urlFormatter = new UrlFormatter(this.request_endpoint);
};

core.prototype = {
  addToken: function(token) {
    if(typeof token === 'undefined') {
      return;
    }

    this.token = token;
    this.hasToken = true;
    console.log('access_token: ' + token);
  },

  setEndpoint: function(type) {
    console.log('setEndpoint', type);

    switch(type) {
      case 'sandbox':
        this.request_endpoint = 'http://api-sandbox.oanda.com';
        this.stream_endpoint = 'http://stream-sandbox.oanda.com';
        this.transport = http;
        break;
      case 'practice':
        this.request_endpoint = 'https://api-fxpractice.oanda.com';
        this.stream_endpoint = 'https://stream-fxpractice.oanda.com';
        this.transport = https;
        break;
      default:
        this.request_endpoint = 'https://api-fxtrade.oanda.com';
        this.stream_endpoint = 'https://stream-fxtrade.oanda.com';
        this.transport = https;
        break;
    }
  },

  setDatetimeFormat: function(type) {
    this.date_time_format = type === 'unix' ? 'UNIX' : 'RFC3339';
    console.log('time_format: ' + this.date_time_format);
  },

  request: function(path, type, opts) {
    console.log('request', path, type, opts);

    this.urlFormatter.setParameters(opts);
    var url, data;

    if(this.appendBodyData(type)) {
      url = this.urlFormatter.getUrl(path, true);
      data = this.urlFormatter.createParamString(this.urlFormmater.params);
    }
    else{
      url = this.urlFormatter.getUrl(path, false);
    }


    var options = this.urlFormatter.getRequestOptions(url);
    options.method = type;

    if(this.hasToken) {
      this.addAuthorizationHeader(options);
    }

    console.log(options);

    return this.makeRequest(options, data);
  },

  stream: function(path, opts) {
    console.log('stream', path, options);

    this.urlFormatter.setParameters(opts);

    var url = this.urlFormatter.getUrl(path, false);

    var options = this.urlFormatter.getRequestOptions(url);
    options.method = 'GET';

    if(this.hasToken) {
      this.addAuthorizationHeader(options);
    }

    console.log(options);

    return this.makeStream(options);
  },

  appendBodyData: function(type) {
    var body = ['POST', 'PUT', 'PATCH'];
    return body.indexOf(type) !== -1;
  },

  addAuthorizationHeader: function(options) {
    options.headers = {
      'Authorization': 'Bearer ' + this.token
    };

    console.log('authorization_header: ' + this.token);
  },

  makeRequest: function(options, body) {
    console.log('makeRequest', options, body);

    return new OandaRequest(this.transport, options, body);
  },

  makeStream: function(options) {
    console.log('makeStream', options);

    return new OandaStream(this.transport, options);
  }
};

module.exports = core;
