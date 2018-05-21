const ROUTES = require('../routes');
const utils = require('../utils');
const { HTTP_METHOD } = require('../constant');

module.exports = class TradeAPI {

  /**
   * This API can be used to access all Oanda V2 Position endpoints
   * https://developer.oanda.com/rest-live-v20/position-ep/
   * 
   * @param {function} request 
   */
  constructor (request) {
    this.request = request;
  }

  listPositions (account_id, callback) {
    utils.assert(account_id, 'An account_id must be supplied to the listPositions endpoint');

    return this.request({
      method: HTTP_METHOD.GET,
      path: ROUTES.position.listPositions,
      params: {
        account_id: account_id
      }
    }, callback);
  }

  listOpenPositions (account_id, callback) {
    utils.assert(account_id, 'An account_id must be supplied to the listOpenPositions endpoint');

    return this.request({
      method: HTTP_METHOD.GET,
      path: ROUTES.position.listOpenPositions,
      params: {
        account_id: account_id
      }
    }, callback);
  }

  getInstrumentPosition (account_id, instrument, callback) {
    utils.assert(account_id, 'An account_id must be supplied to the getInstrumentPosition endpoint');
    utils.assert(instrument, 'An instrument must be supplied to the getInstrumentPosition endpoint');

    return this.request({
      method: HTTP_METHOD.GET,
      path: ROUTES.position.getInstrumentPosition,
      params: {
        account_id: account_id,
        instrument: instrument
      }
    }, callback);
  }

  closePosition (account_id, instrument, data, callback) {
    utils.assert(account_id, 'An account_id must be supplied to the closePosition endpoint');
    utils.assert(instrument, 'An instrument must be supplied to the closePosition endpoint');

    return this.request({
      method: HTTP_METHOD.PUT,
      path: ROUTES.position.closePosition,
      params: {
        account_id: account_id,
        instrument: instrument
      },
      data: data
    }, callback);
  }
};