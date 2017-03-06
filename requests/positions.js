var positions = function(core) {
  this.core = core;
};

positions.prototype = {
  getListOfOpenPositions: function(account_id) {
    var options = {
      account_id: account_id
    };

    return this.core.request(
      `/#{this.core.apiVersion}/accounts/:account_id/positions`, 'GET', options);
  },

  getPositionForInstrument: function(account_id, instrument) {
    var options = {
      account_id: account_id,
      instrument: instrument
    };

    return this.core.request(
      `/#{this.core.apiVersion}/accounts/:account_id/positions/:instrument`, 'GET', options);
  },

  closeExistingPosition: function(account_id, instrument) {
    var options = {
      account_id: account_id,
      instrument: instrument
    };

    return this.core.request(
      `/#{this.core.apiVersion}/accounts/:account_id/positions/:instrument`, 'DELETE', options);
  }
};

module.exports = positions;
