const express = require('express');
const router = express.Router();
const passportGithub = require('../auth/github');

router.get('/', function(req, res) {
  res.render('index', {user: req.user});
});

// TODO: Move routes to their own js file
// Use the github passport strategy
router.get('/auth/github', passportGithub.authenticate('github', {scope: ['user:email']}));

// Handler for the callback from OAuth
router.get('/auth/github/callback',
    passportGithub.authenticate('github', {failureRedirect: '/error'}),
    function(req, res) {
    // For now we just redirect to the main page
      res.redirect('/');
    });

module.exports = router;
