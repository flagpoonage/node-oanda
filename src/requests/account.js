const ROUTES = require('../routes');
const utils = require('../utils');
const { HTTP_METHOD } = require('../constant');

module.exports = class AccountAPI {

  /**
   * This API can be used to access all Oanda V2 Accounts endpoints
   * https://developer.oanda.com/rest-live-v20/account-ep/
   * 
   * @param {OandaAPI} api 
   */
  constructor (request) {
    this.request = request;
  }

  getAccounts (callback) {
    return this.request({
      method: HTTP_METHOD.GET,
      path: ROUTES.account.getAccounts,
      callback: callback
    });
  }

  getAccount (account_id, callback) {
    utils.assert(account_id, 'An account_id must be supplied to the getAccount endpoint');

    return this.request({
      method: HTTP_METHOD.GET,
      path: ROUTES.account.getAccount,
      params: {
        account_id: account_id
      },
      callback: callback
    });
  }

  getAccountSummary (account_id, callback) {
    utils.assert(account_id, 'An account_id must be supplied to the getAccountSummary endpoint');

    return this.request({
      method: HTTP_METHOD.GET,
      path: ROUTES.account.getAccountSummary,
      params: {
        account_id: account_id
      },
      callback: callback
    });
  }

  getAccountInstruments (account_id, instruments, callback) {
    utils.assert(account_id, 'An account_id must be supplied to the getAccountInstruments endpoint');
    utils.assert(Array.isArray(instruments), 'An array of instruments must be supplied to the getAccountInstruments endpoint');

    return this.request({
      method: HTTP_METHOD.GET,
      path: ROUTES.account.getAccountInstruments,
      params: {
        account_id: account_id
      },
      query: {
        instruments: instruments
      },
      callback: callback
    });
  }

  setAccountConfiguration (account_id, alias, marginRate, callback) {
    utils.assert(account_id, 'An account_id must be supplied to the getAccountInstruments endpoint');

    return this.request({
      method: HTTP_METHOD.PATCH,
      path: ROUTES.account.setAccountConfiguration,
      params: {
        account_id: account_id
      },
      data: {
        alias: alias,
        marginRate: marginRate
      },
      callback: callback
    });
  }

  getAccountChanges (account_id, sinceTransactionID, callback) {
    utils.assert(account_id, 'An account_id must be supplied to the getAccountInstruments endpoint');

    return this.request({
      method: HTTP_METHOD.GET,
      path: ROUTES.account.getAccountChanges,
      params: {
        account_id: account_id
      },
      query: {
        sinceTransactionID: sinceTransactionID
      },
      callback: callback
    });
  }
};