module.exports = {
  assert: (test, message) => {
    if (!test) {
      throw new Error(message);
    }
  }
};