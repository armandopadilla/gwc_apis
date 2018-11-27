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
  config: {
    db: fastify.mongo.db,
  },
});