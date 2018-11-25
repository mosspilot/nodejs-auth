const passport = require('passport');
const GitHubStrategy = require('passport-github2').Strategy;
const Account = require('../models/account');
const config = require('../_config');
const init = require('./init');

// Set up the github strategy with provided configuration
passport.use(new GitHubStrategy({
  clientID: config.github.clientID,
  clientSecret: config.github.clientSecret,
  callbackURL: config.github.callbackURL,
},
function(accessToken, refreshToken, profile, done) {
  // Use the github profile id for the search
  const searchQuery = {
    githubId: profile.id,
  };

  // Update the displayname and githubId
  const updates = {
    name: profile.displayName,
    githubId: profile.id,
  };

  const options = {
    upsert: true,
  };

  // Either add the user or update the user
  Account.findOneAndUpdate(searchQuery, updates, options, function(err, user) {
    if (err) {
      return done(err);
    } else {
      return done(null, user);
    }
  });
}
));

// Run the init.js to serialize the user into the session
init();

module.exports = passport;
