const https = require('https');

// Parses the raw HTTP response into a useable format.
const responseParser = (request_options, body) => (resolver, res) => {    
  var buffer = '';
  res.setEncoding('utf8');

  res.on('data', function(chunk) {
    // Each chunk of payload data is added to the buffer.
    buffer += chunk;
  });

  res.on('end', function() {
    let data_object = buffer;
    let valid_json = false;

    // Should be JSON, but don't fail if it isn't.
    try {
      data_object = JSON.parse(buffer);
      valid_json = true;
    }
    catch (exception) {
      console.warn('Invalid JSON data returned from successful response');
    }

    let response = {
      request: request_options,
      headers: res.headers,
      statusCode: res.statusCode,
      isJSON: valid_json,
      data: data_object
    };

    if (body) {
      response.request_body = body;
    }

    resolver(response);
  });
};

module.exports = (options, callback) => {
  let parser = responseParser(options, options.data);
  let data = options.data;

  // Remove it so it's not sent to the https module. That may react badly.
  delete options.data;

  if (typeof callback === 'function') {
    // Generate the request using callbacs.
    let rq = https.request(options, res => parser(callback, res));

    // Callback should be sent in the format (response, err) =>
    rq.on('error', e => {
      callback(null, e);
    });
    
    // If it's been assigned a content type header then it's a payload
    // request
    if (options.headers['Content-Type']) {
      rq.write(data);
    }

    rq.end();

    // Return the request object in case someone wants it.
    return rq;
  }

  // Otherwise generate the request using promises.
  return new Promise((resolve, reject) => {
    let rq = https.request(options, res => parser(resolve, res));

    rq.on('error', reject);
    
    // If it's been assigned a content type header then it's a payload
    // request
    if (options.headers['Content-Type']) {
      rq.write(data);
    }
  
    rq.end();
  });
};