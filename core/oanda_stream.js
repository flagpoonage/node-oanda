var fn = function(transport, options, stream_options) {
  this.transport = transport;
  this.options = options;
  this.stream_options = stream_options;

  this.successFn = function() {};
  this.errorFn = function() {};
  this.completeFn = function() {};
  this.disconnectFn = function() {};

  this.dataFn = function(data) {
    console.log(data);
  };
};

var success_stream = function(response) {
  response.setEncoding('utf8');

  response.on('data', this.dataFn);
  response.on('end', this.disconnectFn);

  console.log();
  console.log('OANDA Stream is connected');
  console.log();
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
      success_stream.bind(this)
    );

    request.on('error', this.errorFn);
    request.end();
    return request;
  }
};

module.exports = fn;
