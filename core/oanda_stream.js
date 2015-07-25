var fn = function(transport, options, stream_options) {
  this.transport = transport;
  this.options = options;
  this.stream_options = stream_options;

  this.successFn = function() {};
  this.errorFn = function() {};
  this.completeFn = function() {};
  this.disconnectFn = function() {};

  this.dataFn = function(data) {
    console.log('Stream data received: ', data);
  };
};

var success_stream = function(response) {
  var buffer = '';
  res.setEncoding('utf8');

  res.on('data', this.dataFn);
  res.on('end', this.disconnect);
};

fn.prototype = {
  data: function(dataFn) {
    this.dataFn = dataFn;
    return this;
  },

  error: function(errorFn) {
    this.errorFn = errorFn;
    return this;
  },

  complete: function(completeFn) {
    this.completFn = completeFn;
    return this;
  },

  disconnect: function(disconnectFn) {
    this.disconnectFn = disconnectFn;
    return this;
  },

  end: function() {
    this.disconnectFn('User initiated');
    this.request.end();
  },

  begin: function() {
    var request = this.transport.request(
      this.options,
      success_stream
    );

    var ef = this.errorFn;
    request.on('error', function(err) {
      ef(err);
    });

    this.request = request;
    return request;
  }
};

module.exports = fn;
