/**
 Opportunity */
const getAccounts = require('./routes/getAccounts');
const getAccount = require('./routes/getAccount');
const postCreatAccount = require('./routes/postCreateAccount');
const patchUpdateAccount = require('./routes/patchUpdateAccount');

module.exports = (fastify, opts, next) => {

  // GET - /opportunity/list
  getAccounts(fastify);

  // GET - /opportunity/:opportunityId
  getAccount(fastify);

  // POST - /opportunity
  postCreatAccount(fastify);

  // PATCH - /opportunity
  patchUpdateAccount(fastify);

  next();
};