const utils = require('./utils');

const {
  OANDA_ENV,
  OANDA_DATEFORMAT,
  HTTP_METHOD,
  API_TYPE,
} = require('./constant');

const urls = require('./urls');
const AccountAPI = require('./requests/account');
const InstrumentAPI = require('./requests/instrument');
const OrderAPI = require('./requests/order');
const TradeAPI = require('./requests/trade');
const PositionAPI = require('./requests/position');
const TransactionAPI = require('./requests/transaction');
const PricingAPI = require('./requests/pricing');
const HttpsRequest = require('./https-request');

const ENV_VALUES = Object.values(OANDA_ENV);
const DATEFORMAT_VALUES = Object.values(OANDA_DATEFORMAT);
const HTTP_METHOD_VALUES = Object.values(HTTP_METHOD);

module.exports = class OandaAPI {
  /**
   * This class can be used to make requests to the Oanda V2 API.
   * @param {object} options
   */
  constructor(options) {
    this.setOptions(options);
    this._request = this._request.bind(this);

    this.accounts = new AccountAPI(this._request);
    this.instruments = new InstrumentAPI(this._request);
    this.orders = new OrderAPI(this._request);
    this.trade = new TradeAPI(this._request);
    this.position = new PositionAPI(this._request);
    this.transaction = new TransactionAPI(this._request);
    this.pricing = new PricingAPI(this._request);
  }

  /**
   * Sets the configuration options for this instance of the Oanda API
   * @param {object} configuration
   */
  setOptions(configuration) {
    configuration = configuration || {};
    configuration.environment = configuration.environment || OANDA_ENV.PRACTICE;
    configuration.dateFormat = configuration.dateFormat || OANDA_DATEFORMAT.RFC;
    configuration.accessToken = configuration.accessToken || '';
    configuration.routePrefix = configuration.routePrefix || '/v3';

    if (configuration.accessToken) {
      this.setAccessToken(configuration.accessToken);
    } 
    else {
      this.removeAccessToken(configuration.accessToken);
    }

    this.setEnvironment(configuration.environment);
    this.setDateFormat(configuration.dateFormat);
    this.setRoutePrefix(configuration.routePrefix);

    this.configuration = configuration;
  }

  /**
   * Sets the API route prefix. For example if the following settings exist
   * base_url: api-fxpractice.oanda.com
   * route_path: /accounts
   * route_prefix: /v3
   *
   * The output request URL will become
   * https://api-fxpractice.oanda.com/v3/accounts
   *
   * Default: 'practice'
   * @param {string} format
   */
  setRoutePrefix(prefix) {
    this.routePrefix = prefix || '';
  }

  /**
   * Sets the URL hosts to use as the base paths for API requests and streams.
   * Can be either 'real' or 'practice'.
   *
   * Default: 'practice'
   * @param {string} format
   */
  setEnvironment(env) {
    utils.assert(
      ENV_VALUES.find(a => a === env),
      `Invalid environment, [${ENV_VALUES.join(
        ',',
      )}] allowed but received [${env}]`,
    );

    this.urls = env === OANDA_ENV.REAL ? urls.real : urls.practice;
  }

  /**
   * Set the access token to be sent in the Authorization header of API requests.
   * @param {string} token
   */
  setAccessToken(token) {
    utils.assert(
      token,
      'You can not remove the access token using the setAccessToken method. Please use removeAccessToken instead',
    );

    this.accessToken = token || 'NO_TOKEN';
  }

  /**
   * Remove the access token so that no Authorization header is sent in API requests.
   */
  removeAccessToken() {
    this.accessToken = null;
  }

  /**
   * Set the date time format sent in the AcceptDatetimeFormat header of API requests.
   * Can be either 'UNIX' or 'RFC3339'
   *
   * Default: 'RFC3339'
   * @param {string} format
   */
  setDateFormat(format) {
    utils.assert(
      DATEFORMAT_VALUES.find(a => a === format),
      `Invalid date format, [${DATEFORMAT_VALUES.join(
        ',',
      )}] allowed but received [${format}]`,
    );

    this.dateFormat = format;
  }

  /**
   * Performs an HTTPS request to the Oanda servers, based on the parameters that were passed in.
   * @param {object} options
   */
  _request(options, callback) {
    utils.assert(options, 'No options were supplied to the request method');

    utils.assert(
      HTTP_METHOD_VALUES.find(a => a === options.method),
      `Invalid HTTP method, [${HTTP_METHOD_VALUES.join(
        ',',
      )}] allowed but received [${options.method}]`,
    );

    let request_options = this._generateRequestOptions(options.method, options);

    return HttpsRequest(request_options, callback);
  }

  /**
   * Generates the request options required by the https module.
   *
   * @param {string} method
   * @param {object} options
   */
  _generateRequestOptions(method, options) {
    let https_options = {};

    // Data is not an https parameter, but it's used later to write the request
    // inside the HttpsRequest function. Probably could do this a bit cleaner
    https_options.data = options.data ? JSON.stringify(options.data) : '';

    // If apiType is specified as stream use stream url
    let url =
      options.apiType === API_TYPE.STREAM ? this.urls.stream : this.urls.rest;
    https_options.apiType = options.apiType;

    return Object.assign(
      https_options,
      this._generateRequestHostOptions(url),
      this._generateRequestPathOptions(method, options, this.routePrefix),
      this._generateRequestHeaders(
        method,
        options,
        this.accessToken,
        this.dateFormat,
        Buffer.byteLength(https_options.data),
      ),
    );
  }

  /**
   * Generate the host and port options required by the https module
   */
  _generateRequestHostOptions(host_url) {
    const output = {
      protocol: 'https:',
    };

    // Split by port if one is specified.
    const url_parts = host_url.split(':');

    if (url_parts.length > 1) {
      let port_num = Number(url_parts[1]);

      utils.assert(
        !isNaN(port_num),
        `Invalid port number, expected a number but received [${port_num}]`,
      );
      utils.assert(
        port_num > 0 && port_num < 65536,
        `Invalid port number, expected [1-65535], but received [${port_num}]`,
      );

      output.host = url_parts[0];
      output.port = port_num;
    } else {
      output.host = host_url;
      output.port = 443;
    }

    return output;
  }

  /**
   * Generates the correct request path using the route template and supplied params
   *
   * @param {string} method
   * @param {object} options
   */
  _generateRequestPathOptions(method, options, prefix) {
    const output = {
      method: method,
      path: options.path,
    };

    // Replace URL params with specified values
    if (options.params) {
      // Parse individual route parameters
      Object.keys(options.params).forEach(key => {
        output.path = output.path.replace(
          new RegExp(`({${key}})`, 'g'),
          options.params[key],
        );
      });
    }

    // Add any additional querystring parameters
    if (options.query) {
      let qs_params = Object.keys(options.query).reduce((acc, key) => {
        let val = options.query[key];

        if (Array.isArray(val)) {
          // Turn array into a csv
          val = val.join();
        }

        acc.push(`${key}=${val}`);
        return acc;
      }, []);

      // Attach query string to the output path.
      output.path =
        qs_params.length > 0
          ? `${output.path}?${qs_params.join('&')}`
          : output.path;
    }

    output.path = `${prefix}${output.path}`;

    return output;
  }

  /**
   * Generates the appropriate HTTP headers to send the request.
   *
   * @param {string} method
   * @param {object} options
   * @param {string} access_token
   * @param {string} date_format
   * @param {number} byte_length
   */
  _generateRequestHeaders(
    method,
    options,
    access_token,
    date_format,
    byte_length,
  ) {
    const output = {
      headers: {},
    };

    // I think in most cases this should be there, but if there's some public facing
    // endpoints in the future it's possibly not wanted.
    if (access_token) {
      output.headers['Authorization'] = `Bearer ${access_token}`;
    }

    // This actually isn't required everywhere, but it just gets ignored if unneeded
    output.headers['Accept-Datetime-Format'] = date_format;

    // If this is a payload request we need to generate the context headers.
    if (
      [HTTP_METHOD.PUT, HTTP_METHOD.POST, HTTP_METHOD.PATCH].indexOf(method) >
      -1
    ) {
      (output.headers['Content-Type'] = 'application/json'),
        (output.headers['Content-Length'] = byte_length);
    }

    return output;
  }
};
