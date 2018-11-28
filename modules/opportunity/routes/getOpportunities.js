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
            type: { type: "string" },
            club: { type: "string" },
            location: { type: "string" },
            status: { type: "string", enum: [ "open", "closed" ] },
            timeCommitment: { type: "string" },
            materialCommitment: { type: "string" },
            label: { type: "string" },
            description: { type: "string" },
            participants: { type: "string" },
            createdDateTime: { type: "string", format: "date-time" },
            updatedDateTime:  { type: "string", format: "date-time" },
            _id: { type: "string" },
            steps: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  label: { type: "string"},
                  description: { type: "string"},
                  required: { type: "string" },
                  status: { type: "string" }
                }
              }
            },
            //endGoal: { type: "array", items: [{ type: "string"}] },
            impact: {
              type: "object",
              properties: {
                girlsHelped: { type: "number" }
              }
            },
          }
        }
      }
    }
  },
  config: {
    db: fastify.mongo.db,
  },
});