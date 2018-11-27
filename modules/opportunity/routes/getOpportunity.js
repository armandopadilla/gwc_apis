/**
 * Fetch a list of opportunities.
 *
 */
const ObjectId = require('mongodb').ObjectId;
const { db: collection } = require('../../../config');

const handler = async (req, res) => {
  const { db } = res.context.config;
  const { opportunityId } = req.params;

  const opportunity = await db.collection(collection.OPP_NAME)
    .findOne({
      _id: ObjectId(opportunityId)
    });

  return res.send(opportunity);
};


module.exports = fastify => fastify.route({
  method: 'GET',
  url: '/:opportunityId',
  handler,
  config: {
    db: fastify.mongo.db,
  },
});