const express = require('express');
const router = express.Router();
const passportGithub = require('../auth/github');

// Use the github passport strategy
router.get('/github', passportGithub.authenticate('github', {scope: ['user:email']}));

// Handler for the callback from OAuth
router.get('/github/callback',
    passportGithub.authenticate('github', {failureRedirect: '/error'}),
    function(req, res) {
    // For now we just redirect to the main page
      res.redirect('/');
    });

module.exports = router;
