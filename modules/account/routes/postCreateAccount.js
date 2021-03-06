/**
 * Create an account...cause why not right?
 *
 * @todo Error catching
 */
const ObjectID = require('mongodb').ObjectId;
const { db: collection } = require('../../../config');

const handler = async (req, res) => {
  const { db } = res.context.config;
  const {
    firstname,
    lastname,
    email,
    cellphone,  //For push yo.
    company
  } = req.body;

  const accountObj = {
    firstname,
    lastname,
    email,
    cellphone,
    company
  };
  const account = await db.collection(collection.ACCOUNT_NAME).insertOne(accountObj);
  return res.send(account.ops[0]);
};


module.exports = fastify => fastify.route({
  method: 'POST',
  url: '/',
  handler,
  schema: {
    tags: ['Account'],
    description: 'Create a new account in the system',
    summary: 'Create account',
    body: {
      type : "object",
      properties: {
        firstname: { type: "string" },
        lastname: { type: "string" },
        email: { type: "string" },
        cellphone: { type: "string" },
        company: { type: "string" }
      },
      required: [ "firstname", "lastname", "email", "cellphone"]
    },
    response: {
      200: {
        description: 'Successful response',
        type: 'object',
        properties: {
          "firstname": { type: "string" },
          "lastname": { type: "string" },
          "duration": { type: "number" },
          "_id": { type: "string" },
        }
      }
    }
  },
  config: {
    db: fastify.mongo.db,
  },
});