# node-oanda

*This is a work in progress that I'm making in my spare time. I cant't guarantee that any of it is fast, stable, or even working. There is no OAuth implementation, so you must already have an access token in order to use the API*

This library is a NodeJS wrapper for the [Oanda REST API](http://developer.oanda.com/rest-live/introduction/). It provides a simple abstraction layer for making requests and retrieving responses from the API.

##Getting started

To install the library, you will need to have [NodeJS](https://nodejs.org/download/) and the [Node Package Manager (npm)](https://nodejs.org/download/) setup on your machine.

In the root folder of your project, run the following:

    npm install node-oanda --save

If you do not want to add a reference to the library in your package.json file you can omit the `--save` parameter.

##Requiring

Once you've installed the package you should be able to require it in your own code. To require the package, add the following line to a javascript file that you would like to use the API in:

    var Oanda = require('node-oanda');

##Initializing the API

Before you can make requests to the API, you need to create a new Oanda object with configuration parameters

    var Oanda = require('node-oanda');

    var config = {
      token: 'my_access_token',
      type: 'practice',
      dateFormat: 'unix'
    };

    var api = new Oanda(config);

####Configuration options

**token (string)**

*Required*

The access token for the account you want to access the API with. You must have an [account with Oanda](https://fxtrade.oanda.com/your_account/fxtrade/register/gate?utm_source=oandaapi&utm_medium=link&utm_campaign=devportaldocs_demo) in order to use the API.

**type (string)**

*Optional. Defaults to* `'real'`

The type parameter specifies which of the [Oanda environments](http://developer.oanda.com/rest-live/development-guide/) you'd like to use.

    'sandbox'
    'practice'
    'real'

**dateFormat (string)**

*Optional. Defaults to* `'RFC3339'`

The date format that you want the API to return. The API supports the following values

    'unix'
    'RFC3339'

##Making API requests

With the API configuration initialized, you can now start retrieving and posting data to the API. The `Oanda` object is broken down into different endpoints as per the Oanda documentation.

####Example request

    var Oanda = require('node-oanda');

    var config = {
      token: 'my_access_token',
      type: 'practice',
      dateFormat: 'unix'
    };

    var api = new Oanda(config);

    // This only creates a request object, the request is not yet sent
    var request = api.accounts.getAccountsForUser();

    // Here we handle a successful response from the server
    request.success(function(data) {
      console.log('Yay! My data: ', data);
    });

    // Here we handle an error returned from the server
    request.error(function(err) {
      console.log('Damn, something went wrong: ', err);
    });

    // Execute the request.
    request.go();

In the example above, we created a request for `getAccountsForUser` which is an endpoint in the `accounts` API. What is returned is simply an object containing details of a request. The request has not yet been sent to the server.

We then add callbacks to the request using the `success` and `error` parameters. When we're finally ready to send the request, we call `go`, the request is sent and appropriate callback will be fired when a response is returned, or the request times out.

##API endpoints

For complete documentation about each of the endpoints, please see the official Oanda documentation. All parameters from the Oanda documentation that are not explicitly listed should be place inside the `options` parameter.

###[Rates](http://developer.oanda.com/rest-live/rates/)

    api.rates.getInstrumentList( account_id, options )
    api.rates.getCurrentPrices( instruments, options )
    api.rates.retrieveInstrumentHistory( instrument, options )

###[Accounts](http://developer.oanda.com/rest-live/accounts/)

    api.accounts.getAccountsForUser( username )
    api.accounts.getAccountInformation( account_id )

###[Orders](http://developer.oanda.com/rest-live/orders/)

    api.orders.getOrdersForAccount( account_id, options )
    api.orders.createNewOrder( account_id, instrument, units, side, type, expiry, price, options )  
    api.orders.getInformationForOrder( account_id, order_id )
    api.orders.modifyExistingOrder( account_id, order_id, options )
    api.orders.closeOrder( account_id, order_id )

###[Trades](http://developer.oanda.com/rest-live/trades/)

    api.trades.getListOfOpenTrades( account_id, options )
    api.trades.getInformationOnSpecificTrade( account_id, trade_id )
    api.trades.modifyExistingTrade( account_id, trade_id, options )
    api.trades.closeOpenTrade( account_id, trade_id )

Work in progress...
