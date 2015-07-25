var ApiCore = require('./core/api_core');
var Accounts = require('./requests/accounts');
var History = require('./requests/history');
var Orders = require('./requests/orders');
var Positions = require('./requests/positions');
var Rates = require('./requests/rates');
var Trades = require('./requests/trades');

var Oanda = function(options) {
  this.core = new ApiCore(options);

  this.accounts = new Accounts(this.core);
  this.history = new History(this.core);
  this.orders = new Orders(this.core);
  this.positions = new Positions(this.core);
  this.rates = new Rates(this.core);
  this.trades = new Trades(this.core);
};

module.exports = Oanda;
