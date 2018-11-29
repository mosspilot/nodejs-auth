const oauth2orize = require('oauth2orize');
const db = require('../db');
const uid = require('uid-safe');

const server = oauth2orize.createServer();

// Serialize on the client id
server.serializeClient((client, done) => done(null, client.id));

// Deserialize by finding the client id in the client db
server.deserializeClient((id, done) => {
  db.clients.findById(id, (error, client) => {
    if (error) return done(error);
    return done(null, client);
  });
});

// Register the authorization code grant type for the authentication code flow.
server.grant(oauth2orize.grant.code((client, redirectUri, user, ares, done) => {
  // Create a 32 character secure UID (represented by 27 bytes in hex).
  // RFC 6819 5.1.4.2.2 specifies >= 128 bits
  const code = uid.sync(27);
  db.authorizationCodes.save(code, client.id, redirectUri, user.id, ares.scope, (error) => {
    if (error) return done(error);
    return done(null, code);
  });
}));

// This function exchanges authorization codes for access tokens which then
// can be utilize by protected resources that require bearer tokens.
server.exchange(oauth2orize.exchange.code((client, code, redirectUri, done) => {
  db.authorizationCodes.find(code, (error, authCode) => {
    if (error) return done(error);

    // Validate that our client Id matches that of the auth code
    if (client.id !== authCode.clientId) return done(null, false);

    // Make sure that the redirect URI is what was provided in the
    // Authorize call.
    if (redirectUri !== authCode.redirectUri) return done(null, false);

    // Generate an access token
    // 256 characters (represented by 192 bytes in hex) should be sufficient for our purposes
    // RFC 6819 5.1.4.2.2 specifies >= 128 bits
    const token = uid.sync(192);

    // Save the access token so that our bearer strategy can verify it
    // TODO: Token expiry
    db.accessTokens.save(token, authCode.userId, authCode.clientId, authCode.scope, (error) => {
      if (error) return done(error);
      return done(null, token);
    });
  });
}));

module.exports = server;
