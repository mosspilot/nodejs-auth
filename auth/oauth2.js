const passport = require('passport');
const BasicStrategy = require('passport-http').BasicStrategy;
const BearerStrategy = require('passport-http-bearer').Strategy;
const db = require('../db');
const Account = require('../models/account.js');

/**
 * This function verifies that a client id and client secret
 * are registered in our database.  
 * @param {string} clientId - the client id
 * @param {string} clientSecret - the client secret
 * @param {done} done - the done callback
 * */
function verifyClient(clientId, clientSecret, done) {
  // TODO: make this mongo db
  db.clients.findByClientId(clientId, (error, client) => {
    if (error) return done(error);
    if (!client) return done(null, false);
    if (client.clientSecret !== clientSecret) return done(null, false);
    return done(null, client);
  });
}

// Use this strategy to protect the token endpoint using the HTTP Basic
// scheme to authenticate using the client secret and client id
passport.use(new BasicStrategy(verifyClient));

// This strategy is registered to be used on api endpoints that we want
// to protect using bearer tokens. The strategy checks that the access
// tokens are found in our database and that the account exists that
// authorized the bearer token.
passport.use(new BearerStrategy(
    (accessToken, done) => {
      db.accessTokens.find(accessToken, (error, token) => {
        if (error) return done(error);
        if (!token) return done(null, false);
        Account.findById(token.userId, (error, user) => {
          if (error) return done(error);
          if (!user) return done(null, false);
          return done(null, user, {scope: token.scope});
        });
      });
    }));
