// The following code was borrowed from an example by gerges-beshay
// here: https://github.com/gerges-beshay/oauth2orize-examples
// I plan on replacing this out in favor of a mongo db collection.
// TODO: make mongo db collection
const tokens = {};

module.exports.find = (key, done) => {
  if (tokens[key]) return done(null, tokens[key]);
  return done(new Error('Token Not Found'));
};

module.exports.findByUserIdAndClientId = (userId, clientId, done) => {
  for (const token in tokens) {
    if (tokens[token].userId === userId && tokens[token].clientId === clientId) return done(null, token);
  }
  return done(new Error('Token Not Found'));
};

module.exports.save = (token, userId, clientId, done) => {
  tokens[token] = { userId, clientId };
  done();
};
