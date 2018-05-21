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

  listAccounts (callback) {
    return this.request({
      method: HTTP_METHOD.GET,
      path: ROUTES.account.listAccounts
    }, callback);
  }

  getAccount (account_id, callback) {
    utils.assert(account_id, 'An account_id must be supplied to the getAccount endpoint');

    return this.request({
      method: HTTP_METHOD.GET,
      path: ROUTES.account.getAccount,
      params: {
        account_id: account_id
      }
    }, callback);
  }

  getAccountSummary (account_id, callback) {
    utils.assert(account_id, 'An account_id must be supplied to the getAccountSummary endpoint');

    return this.request({
      method: HTTP_METHOD.GET,
      path: ROUTES.account.getAccountSummary,
      params: {
        account_id: account_id
      }
    }, callback);
  }

  getInstruments (account_id, query, callback) {
    utils.assert(account_id, 'An account_id must be supplied to the getInstruments endpoint');

    if (query && query.instruments) {
      utils.assert(Array.isArray(query.instruments), 'Instruments must be an Array to the getInstruments endpoint');
    }

    return this.request({
      method: HTTP_METHOD.GET,
      path: ROUTES.account.getInstruments,
      params: {
        account_id: account_id
      },
      query: query
    }, callback);
  }

  updateConfiguration (account_id, data, callback) {
    utils.assert(account_id, 'An account_id must be supplied to the updateConfiguration endpoint');

    return this.request({
      method: HTTP_METHOD.PATCH,
      path: ROUTES.account.updateConfiguration,
      params: {
        account_id: account_id
      },
      data: data
    }, callback);
  }

  getChanges (account_id, query, callback) {
    utils.assert(account_id, 'An account_id must be supplied to the getChanges endpoint');

    return this.request({
      method: HTTP_METHOD.GET,
      path: ROUTES.account.getChanges,
      params: {
        account_id: account_id
      },
      query: query
    }, callback);
  }
};