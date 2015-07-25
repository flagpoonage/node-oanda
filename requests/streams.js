var util = require('../core/oanda_util');

var streams = function(core) {
  this.core = core;
};

streams.prototype = {
  prices: function(account_id, instruments, session_id) {
    var options = {
      accountId: account_id,
      instruments: util.encodeArray(instruments)
    };

    return this.core.stream('/v1/prices', 'GET', options);
  }
};

module.exports = streams;
