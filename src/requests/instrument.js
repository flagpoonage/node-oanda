const ROUTES = require('../routes');
const utils = require('../utils');
const { HTTP_METHOD } = require('../constant');

module.exports = class InstrumentAPI {

  /**
   * This API can be used to access all Oanda V2 Instrument endpoints
   * https://developer.oanda.com/rest-live-v20/instrument-ep/
   * 
   * @param {function} request 
   */
  constructor (request) {
    this.request = request;
  }

  getCandles (instrument, query, callback) {
    utils.assert(instrument, 'An instrument must be supplied to the getCandles endpoint');

    return this.request({
      method: HTTP_METHOD.GET,
      path: ROUTES.instrument.getCandles,
      query: query,
      callback: callback
    });
  }

  getOrderBook (instrument, query, callback) {
    utils.assert(instrument, 'An instrument must be supplied to the getOrderBook endpoint');

    return this.request({
      method: HTTP_METHOD.GET,
      path: ROUTES.instrument.getOrderBook,
      query: query,
      callback: callback
    });
  }

  getPositionBook (instrument, query, callback) {
    utils.assert(instrument, 'An instrument must be supplied to the getPositionBook endpoint');

    return this.request({
      method: HTTP_METHOD.GET,
      path: ROUTES.instrument.getPositionBook,
      query: query,
      callback: callback
    });
  }


};