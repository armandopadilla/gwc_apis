module.exports = {
  db: {
    connInfo: {
      forceClose: true,
      url: 'mongodb://10.0.5.196:27017/gwc_api',
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