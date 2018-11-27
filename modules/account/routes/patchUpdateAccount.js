/**
 * Update an account.
 *
 * @todo Error catching
 */
const ObjectID = require('mongodb').ObjectId;
const { db: collection } = require('../../../config');



const handler = async (req, res) => {
  const { db } = res.context.config;
  const { accountId } = req.params;
  const {
    firstname,
    lastname,
    email,
    cellphone
  } = req.body;

  const accountObj = {
    firstname,
    lastname,
    email,
    cellphone
  };

  const account = await db.collection(collection.ACCOUNT_NAME).updateOne(
    { _id: ObjectID(accountId) },
    { $set: accountObj });

  return res.send(accountObj);
};


module.exports = fastify => fastify.route({
  method: 'PATCH',
  url: '/:accountId',
  handler,
  schema: {
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
    }
  },
  config: {
    db: fastify.mongo.db,
  },
});