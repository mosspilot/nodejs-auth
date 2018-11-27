// The following code was borrowed from an example by gerges-beshay
// here: https://github.com/gerges-beshay/oauth2orize-examples
// I plan on replacing this out in favor of a mongo db collection.
// TODO: make mongo db collection

const clients = [
  {id: '1', name: 'Client1', clientId: 'client1', clientSecret: 'secret1', redirectUri: 'https://www.getpostman.com/oauth2/callback', isTrusted: false},
  {id: '2', name: 'Client2', clientId: 'client2', clientSecret: 'secret2', redirectUri: 'https://www.getpostman.com/oauth2/callback', isTrusted: true},
];

module.exports.findById = (id, done) => {
  for (let i = 0, len = clients.length; i < len; i++) {
    if (clients[i].id === id) return done(null, clients[i]);
  }
  return done(new Error('Client Not Found'));
};

module.exports.findByClientId = (clientId, done) => {
  for (let i = 0, len = clients.length; i < len; i++) {
    if (clients[i].clientId === clientId) return done(null, clients[i]);
  }
  return done(new Error('Client Not Found'));
};
