
const express = require('express');
const router = express.Router();
const passport = require('passport');
const server = require('../auth/oauth2server');

// This is the token endpoint where we exchange an authorization
// code for an access token that can be used for protected
// access token endpoints. Right now we only support basic 
// authentication with the client_id and client_secret.
router.post('/token',
    passport.authenticate('basic', {session: false}),
    server.token(),
    server.errorHandler()
);

module.exports = router;
