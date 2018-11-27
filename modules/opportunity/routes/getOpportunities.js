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
  schema: {
    tags: ['Opportunity'],
    description: 'Get a list of opportunities from system',
    summary: 'Get opportunity list',
    response: {
      200: {
        description: 'Successful response',
        type: 'array',
        items: {
          type: "object",
          properties: {
            title: { type: "string" },
            description:  { type: "string" },
            duration:  { type: "string" },
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