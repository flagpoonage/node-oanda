var utility = {
  define: function(obj, alt) {
    return typeof obj === 'undefined' ? alt : obj;
  },

  encodeArray: function(a) {
    for(var out = '', i = 0; i < a.length; i++) {
      out += a[i] + (i == a.length - 1 ? '' : ',');
    }

    return encodeURIComponent(out);
  }
};

module.exports = utility;
