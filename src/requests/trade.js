const ROUTES = require('../routes');
const utils = require('../utils');
const { HTTP_METHOD } = require('../constant');

module.exports = class TradeAPI {

  /**
   * This API can be used to access all Oanda V2 Instrument endpoints
   * https://developer.oanda.com/rest-live-v20/trade-ep/
   * 
   * @param {function} request 
   */
  constructor (request) {
    this.request = request;
  }

  list (account_id, query, callback) {
    utils.assert(account_id, 'An account_id must be supplied to the list endpoint');

    return this.request({
      method: HTTP_METHOD.GET,
      path: ROUTES.trade.list,
      params: {
        account_id: account_id
      },
      query: query
    }, callback);
  }

  listOpen (account_id, callback) {
    utils.assert(account_id, 'An account_id must be supplied to the listOpen endpoint');

    return this.request({
      method: HTTP_METHOD.GET,
      path: ROUTES.trade.listOpen,
      params: {
        account_id: account_id
      }
    }, callback);
  }

  get (account_id, trade_specifier, callback) {
    utils.assert(account_id, 'An account_id must be supplied to the get endpoint');
    utils.assert(trade_specifier, 'A trade_specifier must be supplied to the get endpoint');

    return this.request({
      method: HTTP_METHOD.GET,
      path: ROUTES.trade.get,
      params: {
        account_id: account_id,
        trade_specifier: trade_specifier
      }
    }, callback);
  }

  closeTrade (account_id, trade_specifier, data, callback) {
    utils.assert(account_id, 'An account_id must be supplied to the closeTrade endpoint');
    utils.assert(trade_specifier, 'A trade_specifier must be supplied to the closeTrade endpoint');

    return this.request({
      method: HTTP_METHOD.PUT,
      path: ROUTES.trade.closeTrade,
      params: {
        account_id: account_id,
        trade_specifier: trade_specifier
      },
      data: data
    }, callback);
  }

  clientExtensions (account_id, trade_specifier, data, callback) {
    utils.assert(account_id, 'An account_id must be supplied to the clientExtensions endpoint');
    utils.assert(trade_specifier, 'A trade_specifier must be supplied to the clientExtensions endpoint');

    return this.request({
      method: HTTP_METHOD.PUT,
      path: ROUTES.trade.clientExtensions,
      params: {
        account_id: account_id,
        trade_specifier: trade_specifier
      },
      data: data
    }, callback);
  }

  orders (account_id, trade_specifier, data, callback) {
    utils.assert(account_id, 'An account_id must be supplied to the orders endpoint');
    utils.assert(trade_specifier, 'A trade_specifier must be supplied to the orders endpoint');

    return this.request({
      method: HTTP_METHOD.PUT,
      path: ROUTES.trade.orders,
      params: {
        account_id: account_id,
        trade_specifier: trade_specifier
      },
      data: data
    }, callback);
  }
};