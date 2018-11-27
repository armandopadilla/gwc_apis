const config = require('./config');
const fastify = require('fastify')(config.server);
const db = config.db;

// Register plugins
fastify.register(require('fastify-cors'), { origin: true });
fastify.register(require('fastify-boom'));
fastify.register(require('fastify-mongodb'), config.db.connInfo);



// Register all endpoints
fastify.register(require('./modules/account'), { prefix: '/account' });
fastify.register(require('./modules/opportunity'), { prefix: '/opportunity' });

const start = async () => {
  try {
    await fastify.listen(3000);
    fastify.log.info(`server listening on ${fastify.server.address().post}`);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

// I need to clean this up.
if (process.env.NODE_ENV === 'test') {
  module.exports = fastify;
} else {
  if (require.main === module) {
    start();
  } else {
    exports.handler = (event, context, callback) => {

      context.callbackWaitsForEmptyEventLoop = false;

      //construct the query string...blah
      let query = '';
      const queryString = event.queryStringParameters;
      if (queryString) {
        Object.keys(queryString).forEach((key) => {
          query += key+'='+queryString[key]+'&';
        });
        query = '?'+query;
      }

      // map lambda event
      const options = {
        method: event.httpMethod,
        url: event.path,
        payload: event.body,
        headers: event.headers,
        validate: false
      };

      fastify.inject(options, function(err, res) {
        const response = {
          statusCode: res.statusCode,
          body: res.payload,
          headers: res.headers
        };

        callback(null, response);
      });

    };
  }
}