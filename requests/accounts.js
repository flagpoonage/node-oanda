var util = require('../core/oanda_util');

var accounts = function(core) {
  this.core = core;
};

accounts.prototype = {
  getAccountsForUser: function(options) {
    options = util.define(options, {});

    return this.core.request('/v1/accounts', 'GET', options);
  },

  getAccountInformation: function(account_id) {
    var options = {
      account_id: account_id
    }

    return this.core.request('/v1/accounts/:account_id', 'GET', options);
  }
};

module.exports = accounts;
