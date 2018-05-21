const ROUTES = require('../routes');
const utils = require('../utils');
const { HTTP_METHOD } = require('../constant');

module.exports = class TradeAPI {

  /**
   * This API can be used to access all Oanda V2 Trade endpoints
   * https://developer.oanda.com/rest-live-v20/trade-ep/
   * 
   * @param {function} request 
   */
  constructor (request) {
    this.request = request;
  }

  listTrades (account_id, query, callback) {
    utils.assert(account_id, 'An account_id must be supplied to the listTrades endpoint');

    return this.request({
      method: HTTP_METHOD.GET,
      path: ROUTES.trade.listTrades,
      params: {
        account_id: account_id
      },
      query: query
    }, callback);
  }

  listOpenTrades (account_id, callback) {
    utils.assert(account_id, 'An account_id must be supplied to the listOpenTrades endpoint');

    return this.request({
      method: HTTP_METHOD.GET,
      path: ROUTES.trade.listOpenTrades,
      params: {
        account_id: account_id
      }
    }, callback);
  }

  getTrade (account_id, trade_specifier, callback) {
    utils.assert(account_id, 'An account_id must be supplied to the getTrade endpoint');
    utils.assert(trade_specifier, 'A trade_specifier must be supplied to the getTrade endpoint');

    return this.request({
      method: HTTP_METHOD.GET,
      path: ROUTES.trade.getTrade,
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

  updateTradeOrders (account_id, trade_specifier, data, callback) {
    utils.assert(account_id, 'An account_id must be supplied to the updateTradeOrders endpoint');
    utils.assert(trade_specifier, 'A trade_specifier must be supplied to the updateTradeOrders endpoint');

    return this.request({
      method: HTTP_METHOD.PUT,
      path: ROUTES.trade.updateTradeOrders,
      params: {
        account_id: account_id,
        trade_specifier: trade_specifier
      },
      data: data
    }, callback);
  }
};