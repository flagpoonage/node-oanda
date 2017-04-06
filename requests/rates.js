var util = require('../core/oanda_util');

var rates = function(core) {
  this.core = core;
};

rates.prototype = {
  getInstrumentList: function(account_id, options) {
    options = util.define(options, {});
    options.account_id = account_id;

    return this.core.request(
      `/${this.core.apiVersion}/instruments`, 'GET', options);
  },

  getCurrentPrices: function(instruments, options) {
    options = util.define(options, {});
    options.instruments = util.encodeArray(instruments);

    return this.core.request(
      `/${this.core.apiVersion}/instruments`, 'GET', options);
  },

  retrieveInstrumentHistory: function(instrument, options) {
    options = util.define(options, {});
    options.instrument = instrument;

    var url = `/${this.core.apiVersion}/candles`;
    if (this.core.apiVersion === 'v3') {
      url = `/${this.core.apiVersion}/instruments/${instrument}/candles`;
      delete options.instrument;
    }

    return this.core.request(url, 'GET', options);
  }
};

module.exports = rates;
