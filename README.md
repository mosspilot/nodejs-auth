# Sample Node.js Auth Application
This is a sample application with an aim at implementing a simple node.js 
## Running the application for local development
1. Clone this repository
1. Install MongoDB as a local instance
1. Generate a self-signed x509 certificate and private key and place them in the sslcert directory
    - [Example instructions on generating an x509 certificate](https://www.ibm.com/support/knowledgecenter/en/SSWHYP_4.0.0/com.ibm.apimgmt.cmc.doc/task_apionprem_gernerate_self_signed_openSSL.html)
    - The x509 certificate must be named `certificate.pem`
    - The private key must be named `key.pem`
1. From the project directory, install npm dependencies `npm install`
1. Run the application in "dev mode" using nodemon
    - Install nodemon globally `npm install -g nodemon`
    - Linux based: `npm run devmode`
    - Windows: 
        - set DEBUG env variable `set DEBUG=jmoss-auth-exercise:*`
        - run the application using nodemon `nodemon start`


# Security
The following section is an ongoing discussion of security related features or considerations. 

## Implemented Basic Security Features
- Web server only supports HTTPS
    - *Potential feature: ngix may be more efficient*
- Utilizes the "helmet" middleware for sane header defaults and reduced attack surface for XSS / CSRF / Cookie abuse, etc
- Utilizes passport-local-mongoose middleware to store passwords in hashed and salted format
- Utilizes espress-session to set cookie attributes

## Hardening Considerations / TODO's
The following is an ongoing list of items to consider for hardening into a production environment. The list is considered in progress and will be updated as new features are developed.

### Certificate management
- Use an x509 certificate from a certificate authority
    - TODO: Support using forward secrecy (DHE/ECDHE)
- Store certificates securely in a keychain / OS

### Database 
- Only support encrypted connections with Mongo DB
- Encrypt the mongo db instance
    - Note: passwords are already salted and hashed

### Local login page
- TODO: Input validation / testing / prevention of injection attacks
- TODO: Testing side channel attack on user account discovery
- TODO: Limited number of login attempts
- TODO: DDOS mitigation

# Other TODOs / Nice to haves:
 - Maybe Revisit serialization approaches for local / github
 - Bring in other profile data to the account collection
