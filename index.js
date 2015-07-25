var ApiCore = require('./core/api_core');
var Accounts = require('./routes/accounts');
var History = require('./routes/history');
var Orders = require('./routes/orders');
var Positions = require('./routes/positions');
var Rates = require('./routes/rates');
var Trades = require('./routes/trades');

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
