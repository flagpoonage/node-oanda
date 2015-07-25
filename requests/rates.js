var util = require('../core/oanda_util');

var rates = function(core) {
  this.core = core;
};

rates.prototype = {
  getInstrumentList: function(account_id, options) {
    options = util.define(options, {});
    options.account_id = account_id;

    return this.core.request(
      '/v1/instruments', 'GET', options);
  },

  getCurrentPrices: function(instruments, options) {
    options = util.define(options, {});
    options.account_id = account_id;

    return this.core.request(
      '/v1/instruments', 'GET', options);
  },

  retrieveInstrumentHistory: function(instrument, options) {
    options = util.define(options, {});
    options.instrument = instrument;

    return this.core.request(
      '/v1/candles', 'GET', options);
  }
};

module.exports = rates;
