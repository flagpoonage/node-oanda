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

  createOrder (account_id, data, callback) {
    utils.assert(account_id, 'An account_id must be supplied to the createOrder endpoint');
    utils.assert(data && data.order, 'An order is required for the createOrder endpoint');

    return this.request({
      method: HTTP_METHOD.POST,
      path: ROUTES.order.createOrder,
      params: {
        account_id: account_id
      },
      data: data
    }, callback);
  }

  getOrders (account_id, query, callback) {
    utils.assert(account_id, 'An account_id must be supplied to the getOrders endpoint');

    return this.request({
      method: HTTP_METHOD.GET,
      path: ROUTES.order.getOrders,
      params: {
        account_id: account_id
      }
    }, callback);
  }

  getPendingOrders (account_id, callback) {
    utils.assert(account_id, 'An account_id must be supplied to the getPendingOrders endpoint');

    return this.request({
      method: HTTP_METHOD.GET,
      path: ROUTES.order.getPendingOrders,
      params: {
        account_id: account_id
      }
    }, callback);
  }

  getOrder (account_id, order_specifier, callback) {
    utils.assert(account_id, 'An account_id must be supplied to the getOrder endpoint');
    utils.assert(order_specifier, 'An order_specifier must be supplied to the getOrder endpoint');

    return this.request({
      method: HTTP_METHOD.GET,
      path: ROUTES.order.getPendingOrders,
      params: {
        account_id: account_id,
        order_specifier: order_specifier
      }
    }, callback);
  }

  updateOrder (account_id, order_specifier, data, callback) {
    utils.assert(account_id, 'An account_id must be supplied to the updateOrder endpoint');
    utils.assert(order_specifier, 'An order_specifier must be supplied to the updateOrder endpoint');

    return this.request({
      method: HTTP_METHOD.PUT,
      path: ROUTES.order.updateOrder,
      params: {
        account_id: account_id,
        order_specifier: order_specifier
      },
      data: data
    }, callback);

  }

  cancelOrder (account_id, order_specifier, callback) {
    utils.assert(account_id, 'An account_id must be supplied to the cancelOrder endpoint');
    utils.assert(order_specifier, 'An order_specifier must be supplied to the cancelOrder endpoint');

    return this.request({
      method: HTTP_METHOD.PUT,
      path: ROUTES.order.cancelOrder,
      params: {
        account_id: account_id,
        order_specifier: order_specifier
      }
    }, callback);

  }

  updateClientExtensions (account_id, order_specifier, data, callback) {
    utils.assert(account_id, 'An account_id must be supplied to the updateClientExtensions endpoint');
    utils.assert(order_specifier, 'An order_specifier must be supplied to the updateClientExtensions endpoint');

    return this.request({
      method: HTTP_METHOD.PUT,
      path: ROUTES.order.updateClientExtensions,
      params: {
        account_id: account_id,
        order_specifier: order_specifier
      },
      data: data
    }, callback);

  }
};
