/**
 * Create an pportunity.
 *
 * @todo Error catching
 * @todo Auth.
 */
const ObjectID = require('mongodb').ObjectId;
const { db: collection } = require('../../../config');

const handler = async (req, res) => {
  const { db } = res.context.config;

  const { title,
    description, // For now just dump all the text in here.
    duration //how long this opportunity will usually take.
  } = req.body;

  const oppObj = {
    title,
    description,
    duration,
    participants: [] //default little homie!
  };
  const opportunity = await db.collection(collection.OPP_NAME).insertOne(oppObj);

  return res.send(opportunity.ops[0]);
};


module.exports = fastify => fastify.route({
  method: 'POST',
  url: '/',
  handler,
  schema: {
    tags: ['Opportunity'],
    description: 'Create a opportunity from system',
    summary: 'Create opportunity',
    body: {
      type: "object",
      properties: {
        title: { type: "string" },
        description:  { type: "string" },
        duration:  { type: "string" },
        "_id": { type: "string" }
      }
    },
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