/**
 Opportunity */
const getOpportunities = require('./routes/getOpportunities');
const getOpportunity = require('./routes/getOpportunity');
const postCreateOportunity = require('./routes/postCreateOpportunity');
const patchUpdateOpportunity = require('./routes/patchUpdateOpportinity');

module.exports = (fastify, opts, next) => {

  // GET - /opportunity/list
  getOpportunities(fastify);

  // GET - /opportunity/:opportunityId
  getOpportunity(fastify);

  // POST - /opportunity
  postCreateOportunity(fastify);

  // PATCH - /opportunity
  patchUpdateOpportunity(fastify);

  next();
}