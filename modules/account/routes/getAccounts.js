/**
 * GET accounts.
 *
 * @todo Error catching
 */
const ObjectID = require('mongodb').ObjectId;
const { db: collection } = require('../../../config');

const handler = async (req, res) => {
  const { db } = res.context.config;
  const accounts = await db.collection(collection.ACCOUNT_NAME).find({}).toArray();
  const total = accounts.length;

  return res.send(accounts);  // @todo - mold the response cause yuck.
};


module.exports = fastify => fastify.route({
  method: 'GET',
  url: '/list',
  handler,
  schema: {
    tags: ['Account'],
    description: 'Get a list of accounts from system',
    summary: 'Get accounts',
    response: {
      200: {
        description: 'Successful response',
        type: 'array',
        items: {
          type: "object",
          properties: {
            "firstname": { type: "string" },
            "lastname": { type: "string" },
            "duration": { type: "number" },
            "_id": { type: "string" },
          }
        }
      }
    }
  },
  config: {
    db: fastify.mongo.db,
  },
});