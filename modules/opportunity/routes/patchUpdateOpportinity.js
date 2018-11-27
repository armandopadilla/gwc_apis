/**
 * Update a specific pportunity.
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

  const { opportunityId } = req.params;

  const oppObj = {
    title,
    description,
    duration
  };

  const data = db.collection(collection.OPP_NAME)
    .updateOne(
      { _id: ObjectID(opportunityId) },
      { $set: oppObj }
    );

  return res.send(oppObj);
};


module.exports = fastify => fastify.route({
  method: 'PATCH',
  url: '/:opportunityId',
  handler,
  config: {
    db: fastify.mongo.db,
  },
});