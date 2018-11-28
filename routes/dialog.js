const express = require('express');
const router = express.Router();
const login = require('connect-ensure-login');
const server = require('../auth/oauth2server');
const db = require('../db');

// The user authorization endpoint
router.get('/authorize',
    login.ensureLoggedIn(),
    server.authorization((clientId, redirectUri, done) => {
      /* By the RFC 6749
      the request must have a response_type, client_id. State,
      scope and redirect_uri are optional but highly recommended.
      Most of this is handled through the server.authorization
      middleware*/
      db.clients.findByClientId(clientId, (error, client) => {
        if (error) return done(error);
        // We need to validate that the redirect uri is the same
        // as what we've registered in our application
        if (client.redirectUri !== redirectUri) return done(error);

        return done(null, client, redirectUri);
      });
    }, (client, user, done) => {
    // Check if grant request qualifies for immediate approval

      // If a client is trusted already, then we can go ahead and approve
      // the request.
      if (client.isTrusted) return done(null, true);

      db.accessTokens.findByUserIdAndClientId(user.id, client.clientId, (error, token) => {
        // Check to see if there is already an access token associated with this UserId
        // and ClientId
        if (token) return done(null, true);

        // If the user does not already have an access token, they will need to give
        // their consent.
        return done(null, false);
      });
    }),
    function(request, response) {
      response.render('dialog', {transactionId: request.oauth2.transactionID, user: request.user, client: request.oauth2.client, scope: request.query.scope});
    });

// Process the allow or deny, triggering the above middleware to send
// the response to the user.
router.post('/authorize/decision',
    login.ensureLoggedIn(),
    server.decision(function(req, done) {
      return done(null, {scope: req.oauth2.req.scope});
    })
);

module.exports = router;
