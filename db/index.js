// The following code was borrowed from an example by gerges-beshay
// here: https://github.com/gerges-beshay/oauth2orize-examples
// I plan on replacing this out in favor of a mongo db collection.
// TODO: make mongo db collection

const clients = require('./clients');
const accessTokens = require('./access_tokens');
const authorizationCodes = require('./authorization_codes');

module.exports = {
  clients,
  accessTokens,
  authorizationCodes,
};
