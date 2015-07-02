var http = require('http');
var https = require('https');
var OandaRequest = require('./oanda_request');
var UrlFormatter = require('./url_formatter');

var core = function(options) {
  options = typeof options === 'undefined' ? {} : options;

  this.addToken(options.token);
  this.setEndpoint(options.type);
  this.setDatetimeFormat(options.dateFormat);
  this.urlFormatter = new UrlFormatter(this.endpoint);
};

core.prototype = {
  addToken: function(token) {
    console.log('addToken', token);

    if(typeof token === 'undefined') {
      return;
    }

    this.token = token;
    this.hasToken = true;
  },

  setEndpoint: function(type) {
    console.log('setEndpoint', type);

    switch(type) {
      case 'sandbox':
        this.endpoint = 'http://api-sandbox.oanda.com';
        this.request_core = http;
        break;
      case 'practice':
        this.endpoint = 'https://api-fxpractice.oanda.com';
        this.request_core = https;
        break;
      default:
        this.endpoint = 'https://api-fxtrade.oanda.com';
        this.request_core = https;
        break;
    }
  },

  setDatetimeFormat: function(type) {
    console.log('setDatetimeFormat', type);

    this.date_time_format = type === 'unix' ? 'UNIX' : 'RFC3339';
  },

  request: function(path, type, opts) {
    console.log('request', path, type, opts);

    this.urlFormatter.setParameters(opts);
    var url;

    if(this.appendBodyData(type)) {
      url = this.urlFormatter.getUrl(path, true);
      data = this.urlFormmater.createParamString(this.urlFormmater.params);
    }
    else{
      url = this.urlFormmater.getUrl(path, false);
    }


    var options = this.urlFormatter.getRequestOptions(url);
    options.method = type;

    if(this.hasToken) {
      this.addAuthorizationHeader(options);
    }

    console.log(options);

    return this.makeRequest(options, data);
  },

  appendBodyData: function(type) {
    var body = ['POST', 'PUT', 'PATCH'];
    return body.indexOf(type) !== -1;
  }

  addAuthorizationHeader: function(options) {
    console.log('addAuthorizationHeader', options);

    options.headers = {
      'Authorization': 'Bearer ' + this.token
    };
  },

  makeRequest: function(options, body) {
    console.log('makeRequest', options, body);

    return new OandaRequest(this.request_core, options, body);
  },

  makeRequestSuccess: function(callback) {
  },
};

module.exports = core;
