// The following code was borrowed from an example by gerges-beshay
// here: https://github.com/gerges-beshay/oauth2orize-examples
// I plan on replacing this out in favor of a mongo db collection.
// TODO: make mongo db collection
const codes = {};

module.exports.find = (key, done) => {
  if (codes[key]) return done(null, codes[key]);
  return done(new Error('Code Not Found'));
};

// TODO: Make the max life of authorization codes 10 minutes per
// RFC 6749.
module.exports.save = (code, clientId, redirectUri, userId, scope, done) => {
  codes[code] = {clientId, redirectUri, userId, scope};
  done();
};
