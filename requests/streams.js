var util = require('../core/oanda_util');

var streams = function(core) {
  this.core = core;
};

streams.prototype = {
  rates: function(account_id, instruments, options) {
    options = util.define(options, {});
    options.accountId = account_id;
    options.instruments = util.encodeArray(instruments);

    return this.core.stream(`/${this.core.apiVersion}/prices`, options);
  }
};

module.exports = streams;
