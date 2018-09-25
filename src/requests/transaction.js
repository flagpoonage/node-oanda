const ROUTES = require('../routes');
const utils = require('../utils');
const { HTTP_METHOD, API_TYPE } = require('../constant');

module.exports = class TradeAPI {

  /**
   * This API can be used to access all Oanda V2 Transaction endpoints
   * https://developer.oanda.com/rest-live-v20/transaction-ep/
   * 
   * @param {function} request 
   */
  constructor (request) {
    this.request = request;
  }
  // "listTransactions": "/accounts/{account_id}/transactions",
  // "getTransaction": "/accounts/{account_id}/transactions/{transaction_id}",
  // "listTransactionsInIDRange": "/accounts/{account_id}/transactions/idrange",
  // "listTransactionsSinceID": "/accounts/{account_id}/transactions/sinceid",
  // "streamTransactions": "/accounts/{account_id}/transactions/stream"

  listTransactions (account_id, callback) {
    utils.assert(account_id, 'An account_id must be supplied to the listTransactions endpoint');

    return this.request({
      method: HTTP_METHOD.GET,
      path: ROUTES.position.listTransactions,
      params: {
        account_id: account_id
      }
    }, callback);
  }

  getTransaction (account_id, transaction_id, callback) {
    utils.assert(account_id, 'An account_id must be supplied to the getTransaction endpoint');
    utils.assert(account_id, 'An transaction_id must be supplied to the getTransaction endpoint');

    return this.request({
      method: HTTP_METHOD.GET,
      path: ROUTES.position.getTransaction,
      params: {
        account_id: account_id,
        transaction_id: transaction_id
      }
    }, callback);
  }

  listTransactionsInIDRange (account_id, query, callback) {
    utils.assert(account_id, 'An account_id must be supplied to the listTransactionsInIDRange endpoint');

    return this.request({
      method: HTTP_METHOD.GET,
      path: ROUTES.position.listTransactionsInIDRange,
      params: {
        account_id: account_id
      },
      query: query
    }, callback);
  }

  listTransactionsSinceID (account_id, query, callback) {
    utils.assert(account_id, 'An account_id must be supplied to the listTransactionsSinceID endpoint');

    return this.request({
      method: HTTP_METHOD.GET,
      path: ROUTES.position.listTransactionsSinceID,
      params: {
        account_id: account_id
      },
      query: query
    }, callback);
  }

  streamTransactions (account_id, callback) {
    utils.assert(account_id, 'An account_id must be supplied to the streamInstrumentPricing endpoint');

    return this.request({
      apiType: API_TYPE.STREAM,
      method: HTTP_METHOD.GET,
      path: ROUTES.transaction.streamTransactions,
      params: {
        account_id: account_id
      }
    }, callback);
  }
};