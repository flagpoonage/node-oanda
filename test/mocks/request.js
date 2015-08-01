var request = function(options, success) {
  this.options = options;
  this.success = success;
};

request.prototype = {
  on: function(key, callback) {
    if(key !== 'error') {
      callback();
    }
  },

  end: function() {
    this.success();
  },

  write: function(data) {
    this.mocked_data = data;
  }
};

module.exports = request;
