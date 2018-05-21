const ROUTES = require('../routes');
const utils = require('../utils');
const { HTTP_METHOD } = require('../constant');

module.exports = class AccountAPI {

  /**
   * This API can be used to access all Oanda V2 Accounts endpoints
   * https://developer.oanda.com/rest-live-v20/account-ep/
   * 
   * @param {function} request 
   */
  constructor (request) {
    this.request = request;
  }

  list (callback) {
    return this.request({
      method: HTTP_METHOD.GET,
      path: ROUTES.account.list
    }, callback);
  }

  get (account_id, callback) {
    utils.assert(account_id, 'An account_id must be supplied to the get endpoint');

    return this.request({
      method: HTTP_METHOD.GET,
      path: ROUTES.account.get,
      params: {
        account_id: account_id
      }
    }, callback);
  }

  summary (account_id, callback) {
    utils.assert(account_id, 'An account_id must be supplied to the summary endpoint');

    return this.request({
      method: HTTP_METHOD.GET,
      path: ROUTES.account.summary,
      params: {
        account_id: account_id
      }
    }, callback);
  }

  instruments (account_id, query, callback) {
    utils.assert(account_id, 'An account_id must be supplied to the instruments endpoint');

    if (query && query.instruments) {
      utils.assert(Array.isArray(query.instruments), 'Instruments must be an Array to the instruments endpoint');
    }

    return this.request({
      method: HTTP_METHOD.GET,
      path: ROUTES.account.instruments,
      params: {
        account_id: account_id
      },
      query: query
    }, callback);
  }

  configuration (account_id, data, callback) {
    utils.assert(account_id, 'An account_id must be supplied to the configuration endpoint');

    return this.request({
      method: HTTP_METHOD.PATCH,
      path: ROUTES.account.configuration,
      params: {
        account_id: account_id
      },
      data: data
    }, callback);
  }

  changes (account_id, query, callback) {
    utils.assert(account_id, 'An account_id must be supplied to the changes endpoint');

    return this.request({
      method: HTTP_METHOD.GET,
      path: ROUTES.account.changes,
      params: {
        account_id: account_id
      },
      query: query
    }, callback);
  }
};