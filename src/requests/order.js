const ROUTES = require('../routes');
const utils = require('../utils');
const { HTTP_METHOD } = require('../constant');

module.exports = class OrderAPI {

  /**
   * This API can be used to access all Oanda V2 Instrument endpoints
   * https://developer.oanda.com/rest-live-v20/order-ep/
   * 
   * @param {function} request 
   */
  constructor (request) {
    this.request = request;
  }

  create (account_id, data, callback) {
    utils.assert(account_id, 'An account_id must be supplied to the create endpoint');
    utils.assert(data && data.order, 'An order is required for the create endpoint');

    return this.request({
      method: HTTP_METHOD.POST,
      path: ROUTES.order.create,
      params: {
        account_id: account_id
      },
      data: data
    }, callback);
  }

  list (account_id, query, callback) {
    utils.assert(account_id, 'An account_id must be supplied to the list endpoint');

    return this.request({
      method: HTTP_METHOD.GET,
      path: ROUTES.order.list,
      params: {
        account_id: account_id
      }
    }, callback);
  }

  listPending (account_id, callback) {
    utils.assert(account_id, 'An account_id must be supplied to the listPending endpoint');

    return this.request({
      method: HTTP_METHOD.GET,
      path: ROUTES.order.listPending,
      params: {
        account_id: account_id
      }
    }, callback);
  }

  get (account_id, order_specifier, callback) {
    utils.assert(account_id, 'An account_id must be supplied to the get endpoint');
    utils.assert(order_specifier, 'An order_specifier must be supplied to the get endpoint');

    return this.request({
      method: HTTP_METHOD.GET,
      path: ROUTES.order.get,
      params: {
        account_id: account_id,
        order_specifier: order_specifier
      }
    }, callback);
  }

  update (account_id, order_specifier, data, callback) {
    utils.assert(account_id, 'An account_id must be supplied to the update endpoint');
    utils.assert(order_specifier, 'An order_specifier must be supplied to the update endpoint');

    return this.request({
      method: HTTP_METHOD.PUT,
      path: ROUTES.order.update,
      params: {
        account_id: account_id,
        order_specifier: order_specifier
      },
      data: data
    }, callback);

  }

  cancel (account_id, order_specifier, callback) {
    utils.assert(account_id, 'An account_id must be supplied to the cancel endpoint');
    utils.assert(order_specifier, 'An order_specifier must be supplied to the cancel endpoint');

    return this.request({
      method: HTTP_METHOD.PUT,
      path: ROUTES.order.cancel,
      params: {
        account_id: account_id,
        order_specifier: order_specifier
      }
    }, callback);

  }

  clientExtensions (account_id, order_specifier, data, callback) {
    utils.assert(account_id, 'An account_id must be supplied to the clientExtensions endpoint');
    utils.assert(order_specifier, 'An order_specifier must be supplied to the clientExtensions endpoint');

    return this.request({
      method: HTTP_METHOD.PUT,
      path: ROUTES.order.clientExtensions,
      params: {
        account_id: account_id,
        order_specifier: order_specifier
      },
      data: data
    }, callback);

  }
};
