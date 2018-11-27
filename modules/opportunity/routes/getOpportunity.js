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
  schema: {
    tags: ['Opportunity'],
    description: 'Get a specific opportunity from system',
    summary: 'Get opportunity',
    response: {
      200: {
        description: 'Successful response',
        type: "object",
        properties: {
          title: { type: "string" },
          description:  { type: "string" },
          duration:  { type: "string" },
          "_id": { type: "string" },
        }
      }
    }
  },
  config: {
    db: fastify.mongo.db,
  },
});