/**
 * GET an account.
 *
 * @todo Error catching
 */
const ObjectID = require('mongodb').ObjectId;
const { db: collection } = require('../../../config');

const handler = async (req, res) => {
  const { accountId } = req.params;
  const { db } = res.context.config;

  const accountObj = await db.collection(collection.ACCOUNT_NAME)
    .findOne({ _id: ObjectID(accountId) });

  return res.send(accountObj);
};


module.exports = fastify => fastify.route({
  method: 'GET',
  url: '/:accountId',
  handler,
  config: {
    db: fastify.mongo.db,
  },
  schema: {
    params: {
      accountId: { type: "string" }
    }
  }
});