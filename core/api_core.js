var http = require('http');
var https = require('https');
var util = require('./oanda_util');
var OandaRequest = require('./oanda_request');
var OandaStream = require('./oanda_stream');
var UrlFormatter = require('./url_formatter');

var core = function(options) {
  options = typeof options === 'undefined' ? {} : options;

  this.setToken(options.token);
  this.setEndpoint(options.type);
  this.setDatetimeFormat(options.dateFormat);
  this.requestUrlFormatter = new UrlFormatter(this.request_endpoint);
  this.streamUrlFormatter = new UrlFormatter(this.stream_endpoint);

  console.log();
  console.log('OANDA Core initialized.');
  console.log();
};

core.prototype = {
  setToken: function(token) {
    if(typeof token === 'undefined') {
      return;
    }

    this.token = token;
    this.hasToken = true;
    console.log('access_token: ' + token);
  },

  setEndpoint: function(type) {

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

    console.log('request_endpoint: ' + this.request_endpoint);
    console.log('stream_endpoint: ' + this.stream_endpoint);
  },

  setDatetimeFormat: function(type) {
    this.date_time_format = type === 'unix' ? 'UNIX' : 'RFC3339';
    console.log('time_format: ' + this.date_time_format);
  },

  request: function(path, type, opts) {
    console.log('request', path, type, opts);

    this.requestUrlFormatter.setParameters(opts);
    var url, data;

    if(this.appendBodyData(type)) {
      url = this.requestUrlFormatter.getUrl(path, true);
      data = this.requestUrlFormatter.createParamString(this.urlFormmater.params);
    }
    else{
      url = this.requestUrlFormatter.getUrl(path, false);
    }


    var options = this.requestUrlFormatter.getRequestOptions(url);
    options.method = type;
    options.headers = util.define(options.headers, {});

    if(this.hasToken) {
      this.addAuthorizationHeader(options);
    }

    this.addDateFormatHeader(options);

    return this.makeRequest(options, data);
  },

  stream: function(path, opts) {
    console.log('stream', path, options);

    this.streamUrlFormatter.setParameters(opts);

    var url = this.streamUrlFormatter.getUrl(path, false);

    var options = this.streamUrlFormatter.getRequestOptions(url);
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
    options.headers['Authorization'] = 'Bearer ' + this.token;
  },

  addDateFormatHeader: function(options) {
    options.headers['X-Accept-Datetime-Format'] = this.date_time_format;
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
