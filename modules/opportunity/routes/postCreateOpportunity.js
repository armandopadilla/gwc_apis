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

  const {
    type,
    club,
    location,
    status,
    timeCommitment,
    materialCommitment, // array of strings
    label,
    description,
    steps, //Array of objects
    endGoal,
  } = req.body;

  const oppObj = {
    type,
    club,
    location,
    status,
    timeCommitment,
    materialCommitment,
    label,
    description,
    steps: steps || [],
    endGoal,
    impact: {
      girlsHelped: 0
    },
    participants: [], //default little homie!
    createdDateTime: new Date(),
    updatedDateTime: new Date()
  };

console.log(oppObj);
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
        type: { type: "string" },
        club: { type: "string" },
        location: { type: "string" },
        status: { type: "string", enum: [ "open", "closed" ] },
        timeCommitment: { type: "string" },
        materialCommitment: { type: "string" },
        label: { type: "string" },
        description: { type: "string" },
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
        endGoal: { type: "array", items: [{ type: "string"}] },
        impact: {
          type: "object",
          properties: {
            girlsHelped: { type: "number" }
          }
        },
        participants: { type: "string" },
        createdDateTime: { type: "string", format: "date-time" },
        updatedDateTime:  { type: "string", format: "date-time" }
      },
      required: [
        "label",
        "description",
        "steps",
        "endGoal",
        "type",
        "club",
        "location",
        "status",
        "timeCommitment",
        "materialCommitment"
      ]
    },
    response: {
      200: {
        description: 'Successful response',
        type: "object",
        properties: {
          "_id": { type: "string" },
        }
      }
    }
  },
  config: {
    db: fastify.mongo.db,
  },
});