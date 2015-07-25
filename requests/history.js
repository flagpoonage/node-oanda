var util = require('../core/oanda_util');

var history = function(core) {
  this.core = core;
};

history.prototype = {
  getTransactionHistory: function(account_id, options) {
    options = util.define(options, {});
    options.account_id = account_id;

    return this.core.request(
      '/v1/accounts/:account_id/transactions', 'GET', options);
  },

  getInformationForTransaction: function(account_id, transation_id) {
    var options = {
      account_id: account_id,
      transation_id: transation_id
    };

    return this.core.request(
      '/v1/accounts/:account_id/transactions/:transaction_id', 'GET', options);
  },

  getFullAccountHistory: function(account_id) {
    var options = {
      account_id: account_id
    };

    return this.core.request(
      '/v1/accounts/:account_id/alltransactions', 'GET', options);
  }
};

module.exports = history;
