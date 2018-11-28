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
          }
        }
      }
    }
  },
  config: {
    db: fastify.mongo.db,
  },
});