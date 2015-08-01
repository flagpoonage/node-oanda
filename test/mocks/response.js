var response = function(responseData) {
  this.responseData = responseData;
  this.statusCode = 200;
};

response.prototype = {
  setEncoding: function() {},
  on: function(key, cb) {
    if(key === 'data') {
      cb(this.repsonseData);
    }
    else if(key === 'end') {
      cb();
    }
  }
};

module.exports = response;
