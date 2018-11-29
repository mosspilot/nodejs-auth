const express = require('express');
const passport = require('passport');
const router = express.Router();

// This is the user info get endpoint protected by access tokens
// Needs to conform with RFC6750
router.get('/', passport.authenticate('bearer', {session: false}),
    function(req, res, next) {
      // Make sure there's scope in the bearer token
      // TODO: refactor duplicate code
      if (!req.authInfo.scope) {
        res.set({'WWW-Authenticate': 'Bearer realm="Jeff Moss"'});
        res.statusCode = 401;
        return res.end('Unauthorized');
      }
      // Ensure that the openid scope has been approved in the bearer token
      if (!req.authInfo.scope.includes('openid')) {
        res.statusCode = 401;
        res.set({'WWW-Authenticate': 'Bearer realm="Jeff Moss", error="insufficient_scope"'});
        return res.end('Unauthorized, insufficient scope');
      }
      return next();
    },
    function(req, res) {
      return returndata(req, res);
    });

// This is the user info post endpoint protected by access tokens
router.post('/', passport.authenticate('bearer', {session: false}),
    function(req, res, next) {
      // Make sure there's scope in the bearer token
      if (!req.authInfo.scope) {
        res.set({'WWW-Authenticate': 'Bearer realm="Jeff Moss"'});
        res.statusCode = 401;
        return res.end('Unauthorized');
      }
      // Ensure that the openid scope has been approved in the bearer token
      if (!req.authInfo.scope.includes('openid')) {
        res.statusCode = 401;
        res.set({'WWW-Authenticate': 'Bearer realm="Jeff Moss", error="insufficient_scope"'});
        return res.end('Unauthorized, insufficient scope');
      }
      return next();
    },
    function(req, res) {
      return returndata(req, res);
    });

/**
* Prepare the appropriate data to return to the user
* through the user endpoint.
* @param {request} req - the request
* @param {response} res - the response
*/
function returndata(req, res) {
  // Some dummy data to mock this out.
  // TODO: replace with real data
  // TODO: Double check compliance with the spec
  // https://openid.net/specs/openid-connect-core-1_0.html#UserInfo
  const profiledummydata = {
    'sub': req.user.id,
    'name': req.user.name,
    'family_name': 'dummydata',
    'given_name': 'dummydata',
    'middle_name': 'dummydata',
    'nickname': 'dummydata',
    'preferred_username': 'dummydata',
    'profile': 'dummydata',
    'picture': 'dummydata',
    'website': 'dummydata',
    'gender': 'dummydata',
    'birthdate': 'dummydata',
    'zoneinfo': 'dummydata',
    'locale': 'dummydata',
    'updated_at': 'dummydata'};
  const emaildummydata = 'tester@test.com';

  let returndata = {};
  for (const scope of req.authInfo.scope) {
    if (scope === 'profile') {
      returndata = profiledummydata;
    }
    if (scope === 'email') {
      returndata.email = emaildummydata;
    }
  }

  res.json(returndata);
}

module.exports = router;
