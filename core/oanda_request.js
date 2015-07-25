var fn = function(transport, options, data) {
  this.transport = transport;
  this.data = data;
  this.options = options;
  
  this.successFn = function() {};
  this.errorFn = function() {};
};

var successWrapper = function(callback) {
  console.log('successWrapper', callback);

  return function(res) {
    var buffer = '';
    res.setEncoding('utf8');

    res.on('data', function(chunk) {
      buffer += chunk;
    });

    res.on('end', function() {
      var obj = JSON.parse(buffer);
      callback(obj, res.statusCode);
    });
  };
};

fn.prototype = {
  success: function(cb) {
    this.successFn = cb;
    return this;
  },

  error: function(cb) {
    this.errorFn = cb;
    return this;
  },

  go: function() {
    var request = this.transport.request(
      this.options,
      successWrapper(this.successFn));

    request.on('error', function(err) {
      this.errorFn(res.statusCode, err);
    });

    if(typeof this.data !== 'undefined') {
      request.write(this.data);
    }

    request.end();
    return request;
  }
};

module.exports = fn;
