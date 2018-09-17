const OANDA_ENV = {
  REAL: 'real',
  PRACTICE: 'practice'
};

const OANDA_DATEFORMAT = {
  UNIX: 'UNIX',
  RFC: 'RFC3339'
};

const HTTP_METHOD = {
  GET: 'GET',
  PUT: 'PUT',
  POST: 'POST',
  PATCH: 'PATCH',
  DELETE: 'DELETE'
};

const API_TYPE = {
  STREAM: 'STREAM',
  REST: 'REST'
};

module.exports = {
  OANDA_ENV,
  OANDA_DATEFORMAT,
  HTTP_METHOD,
  API_TYPE
};