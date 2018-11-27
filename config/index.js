module.exports = {
  db: {
    connInfo: {
      forceClose: true,
      url: 'mongodb://localhost:27017/gwc_api',
      useNewUrlParser: true,
    },
    OPP_NAME: 'opportunities',
    ACCOUNT_NAME: 'accounts'
  },
  server: {
    logger: false
  },
  aws: {
    auth: {
      ACCESS_KEY_ID: '',
      SECRET_KEY: ''
    },
    ses: {
      region: 'us-west-2'
    }
  }
};