var util = require('../core/oanda_util');

var orders = function(core) {
  this.core = core;
}

orders.prototype = {
  getOrdersForAccount: function(account_id, options) {
    options = util.define(options, {});
    options.account_id = account_id;

    return this.core.request(
      '/v1/accounts/:account_id/orders', 'GET', options);
  },

  createNewOrder: function(account_id, options) {
    options = util.define(options, {});
    options.account_id = account_id;

    return this.core.request(
      '/v1/accounts/:account_id/orders', 'POST', options);
  },

  getInformationForOrder: function(account_id, order_id) {
    var options = {
      account_id: account_id,
      order_id: order_id
    };

    return this.core.request(
      '/v1/accounts/:account_id/orders/:order_id', 'GET', options);
  },

  modifyExistingOrder: function(account_id, order_id, options) {
    options = util.define(options, {});
    options.account_id = account_id;
    options.order_id = order_id;

    return this.core.request(
      '/v1/accounts/:account_id/orders/:order_id', 'PATCH', options);
  },

  closeOrder: function(account_id, order_id) {
    var options = {
      account_id: account_id,
      order_id: order_id
    };

    return this.core.request(
      '/v1/accounts/:account_id/orders/:order_id', 'DELETE', options);
  }
};

module.exports = orders;
