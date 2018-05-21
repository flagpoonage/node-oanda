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

  candles (instrument, query, callback) {
    utils.assert(instrument, 'An instrument must be supplied to the candles endpoint');

    return this.request({
      method: HTTP_METHOD.GET,
      path: ROUTES.instrument.candles,
      params: {
        instrument: instrument
      },
      query: query
    }, callback);
  }

  orderBook (instrument, query, callback) {
    utils.assert(instrument, 'An instrument must be supplied to the orderBook endpoint');

    return this.request({
      method: HTTP_METHOD.GET,
      path: ROUTES.instrument.orderBook,
      params: {
        instrument: instrument
      },
      query: query
    }, callback);
  }

  positionBook (instrument, query, callback) {
    utils.assert(instrument, 'An instrument must be supplied to the positionBook endpoint');

    return this.request({
      method: HTTP_METHOD.GET,
      path: ROUTES.instrument.positionBook,
      params: {
        instrument: instrument
      },
      query: query
    }, callback);
  }


};