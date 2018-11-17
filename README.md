TODO: Writeup

Scaffolding:

- Uses helmet for sane header defaults

- Need to create an SSL certificate and put it in the ssl cert directory.
 certificate.pem
 key.pem

 - HTTPS could be more efficient using nginx
 - Minimum TLS negotiation as a TODO
 - Forward Secrecy using DHE/ ECDHE for TLS as a TODO

Express session:
 - This should be set to allow only secure cookies

Database:
- Requires mongodb
- Did this through homebrew on a local env
- Should enforce tls connection to db
- Prevent injection attacks using parameterized values
