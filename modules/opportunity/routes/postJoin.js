/**
 * Join an opportunity.
 *
 * @todo Error catching
 * @todo Auth.
 */
const ObjectID = require('mongodb').ObjectId;
const { db: collection } = require('../../../config');

const handler = async (req, res) => {
  const { db } = res.context.config;
  const { opportunityId, userId } = req.params;

  // Add the user to
  const opp = await db.collection(collection.OPP_NAME).updateOne(
    { _id: ObjectID(opportunityId) },
    { $addToSet: { partcipants: userId }}
  );

  // Dang we're done little homie
  console.log(opp);
  return res.send(opp);
};


module.exports = fastify => fastify.route({
  method: 'POST',
  url: '/:opportunityId/join',
  handler,
  schema: {
    tags: ['Opportunity'],
    description: 'Join a specific oportunity',
    summary: 'Join opportunity',
    body: {
      type: "object",
      properties: {
        userId: { type: "string" },
      },
      required: ["userId"]
    },
    response: {
      200: {
        description: 'Successful response',
        type: "object"
      }
    }
  },
  config: {
    db: fastify.mongo.db,
  },
});