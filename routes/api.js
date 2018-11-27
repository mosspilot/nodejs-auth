const express = require('express');
const passport = require('passport');
const router = express.Router();

// This is the user info endpoint protected by access tokens
router.get('/userinfo', passport.authenticate('bearer', {session: false, failureRedirect: '/login'}),
    function(req, res) {
      res.json({user_id: req.user_id});
    });

module.exports = router;
