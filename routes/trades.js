var util = require('../core/oanda_util');

var trades = function(core) {
  this.core = core;
};

trades.prototype = {
  getListOfOpenTrades: function(account_id, options) {
    options = util.define(options, {});
    options.account_id = account_id;

    return this.core.request(
      '/v1/accounts/:account_id/trades', 'GET', options);
  },

  getInformationOnSpecificTrade: function(account_id, trade_id) {
    var options = {
      account_id: account_id,
      trade_id: trade_id
    };

    return this.core.request(
      '/v1/accounts/:account_id/trades/:trade_id', 'GET', options);
  },

  modifyExistingTrade: function(account_id, trade_id, options) {
    options = util.define(options, {});
    options.account_id = account_id;
    options.trade_id = trade_id;

    return this.core.request(
      '/v1/accounts/:account_id/trades/:trade_id', 'PATCH', options);
  },

  closeOpenTrade: function(account_id, trade_id) {
    var options = {
      account_id: account_id,
      trade_id: trade_id
    };

    return this.core.request(
      '/v1/accounts/:account_id/trades/:trade_id', 'DELETE', options);
  }
};

module.exports = trades;
