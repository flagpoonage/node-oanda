var Response = require('./response');
var Request = require('./request');

var http = function(responseString) {
  this.response = new Response(responseString);
};

http.prototype = {
  request: function(options, successFn) {
    return new Request(successFn);
  }
};

module.exports = http;
