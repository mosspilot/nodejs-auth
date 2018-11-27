const express = require('express');
const router = express.Router();
const passportGithub = require('../auth/github');

// Use the github passport strategy
router.get('/github', passportGithub.authenticate('github', {scope: ['user:email']}));

// Handler for the callback from OAuth
router.get('/github/callback',
    passportGithub.authenticate('github',
        {successReturnToOrRedirect: '/', failureRedirect: '/error'}));

module.exports = router;
