module.exports = {
  db: {
    connInfo: {
      forceClose: true,
      url: 'mongodb://admin:reinvent-gwc1@dbh84.mlab.com:27847/gwc_api',
      useNewUrlParser: true,
    },
    OPP_NAME: 'opportunities',
    ACCOUNT_NAME: 'accounts'
  },
  server: {
    logger: true
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