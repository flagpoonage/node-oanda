var util = require('../core/oanda_util');

var accounts = function(core) {
  this.core = core;
};

accounts.prototype = {
  getAccountsForUser: function(options) {
    options = util.define(options, {});
    return this.core.request(`/${this.core.apiVersion}/accounts`, 'GET', options);
  },

  getAccountInformation: function(account_id) {
    var options = {
      account_id: account_id
    }

    return this.core.request(`/${this.core.apiVersion}/accounts/:account_id`, 'GET', options);
  }
};

module.exports = accounts;
