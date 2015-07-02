var qs = require('qs');

var formatter = function(base_url) {
  this.base_url = this.setTrailingSlash(base_url);
  this.setParameters({});
};

var protocol_split_error = "Invalid URL, could not split by ://";

formatter.prototype = {
  setParameters: function(params) {

    this.params = params;
  },

  getUrl: function(path, no_querystring) {

    var pieces = path.split('/');

    this.substitutePieces(pieces, this.params);

    var url = this.base_url + pieces.join('/');

    var paramString = no_querystring ?
      '' : qs.stringify(this.params);

    return url + (paramString.length > 0 ? '?' + paramString : '');
  },

  getRequestOptions: function(url) {

    var opt = Object.create(null);
    if(typeof url === 'undefined') {
      return undefined;
    }

    var res = this.protocolSplit(url);
    opt.protocol = res.protocol;
    url = res.continue;

    var pieces = this.removeEmptyStrings(url.split('/'));
    var host = pieces[0].split(':');
    pieces.splice(0, 1);

    opt.host = host[0];
    opt.port = this.createPortFromHost(host, opt.protocol);
    opt.path = this.createPath(pieces);

    return opt;
  },

  createPortFromHost: function(host, protocol) {

    if(host.length > 1) {
      var port = parseInt(host[1], 10);
      return isNaN(port) ? 80 : port;
    }

    return protocol === 'https:' ? 443 : 80;
  },

  createPath: function(pieces) {

    return '/' + pieces.join('/');
  },

  protocolSplit: function(url) {

    var split = url.split('://');

    if(split.length < 2) {
      throw protocol_split_error;
    }

    return {
      protocol: split[0] + ':',
      continue: split[1]
    };
  },

  removeEmptyStrings: function(arr) {

    var out = [];

    for(var i = 0; i < arr.length; i++) {
      if(arr[i].length > 0) {
        out.push(arr[i]);
      }
    }

    return out;
  },

  substitutePieces: function(pieces, params) {

    for(var i = 0; i < pieces.length; i++) {
      if(this.isParameter(pieces[i])) {
        var key = this.getKey(pieces[i]);
        var value = params[key];

        if(typeof key === 'undefined' ||
           typeof value === 'undefined') {
          continue;
        }

        pieces[i] = value;
        delete params[key];
      }
    }
  },

  setTrailingSlash: function(value) {

    if(typeof value === 'undefined' || value.length === 0) {
      return value;
    }

    if(value[value.length - 1] === '/') {
      return value;
    }
    else{
      return value + '/';
    }
  },

  getKey: function(piece) {

    return piece.substr(1);
  },

  isParameter: function(piece) {

    return piece[0] === ':';
  }
};

module.exports = formatter;
