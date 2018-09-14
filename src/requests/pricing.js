const ROUTES = require('../routes');
const utils = require('../utils');
const { HTTP_METHOD } = require('../constant');

module.exports = class PricingAPI {

  /**
   * This API can be used to access all Oanda V2 Pricing endpoints
   * http://developer.oanda.com/rest-live-v20/pricing-ep/
   * 
   * @param {function} request 
   */
  constructor (request) {
    this.request = request;
  }

  getInstrumentPricing (account_id, query, callback) {
    utils.assert(account_id, 'An account_id must be supplied to the getInstrumentPricing endpoint');

    if (query && query.instruments) {
      utils.assert(Array.isArray(query.instruments), 'Instruments must be an Array to the getInstrumentPricing endpoint');
    }

    return this.request({
      method: HTTP_METHOD.GET,
      path: ROUTES.pricing.getInstrumentPricing,
      params: {
        account_id: account_id
      },
      query: query
    }, callback);
  }

  streamInstrumentPricing () {
    throw new Error('The streaming API has not yet been implemented');
  }
};