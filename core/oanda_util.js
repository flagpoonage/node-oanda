var utility = {
  define: function(obj, alt) {
    return typeof obj === 'undefined' ? alt : obj;
  }
};

module.exports = utility;
