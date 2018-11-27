/**
 * Fetch a list of opportunities.
 *
 */
const ObjectID = require('mongodb').ObjectId;
const { db: collection } = require('../../../config');

const handler = async (req, res) => {
  const { db } = res.context.config;

  const opportunities = await db.collection(collection.OPP_NAME)
    .find({})
    .toArray();

  const total = opportunities.length;

  return res.send(opportunities);
};


module.exports = fastify => fastify.route({
  method: 'GET',
  url: '/list',
  handler,
  config: {
    db: fastify.mongo.db,
  },
});