var ApiCore = require('./core/api_core');
var Accounts = require('./requests/accounts');
var History = require('./requests/history');
var Orders = require('./requests/orders');
var Positions = require('./requests/positions');
var Rates = require('./requests/rates');
var Trades = require('./requests/trades');
var Streams = require('./requests/streams');
var util = require('./core/oanda_util');

var Oanda = function(options) {
  options = util.define(options, {});
  options.silent = util.define(options.silent, true);

  this._options = options;
  this.setCore(ApiCore);
};

Oanda.prototype.setCore = function(core) {
  this.core = new core(this._options);

  this.accounts = new Accounts(this.core);
  this.history = new History(this.core);
  this.orders = new Orders(this.core);
  this.positions = new Positions(this.core);
  this.stream = new Streams(this.core);
  this.rates = new Rates(this.core);
  this.trades = new Trades(this.core);
};

module.exports = Oanda;
