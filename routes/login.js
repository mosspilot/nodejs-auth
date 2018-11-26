const express = require('express');
const passport = require('passport');
const router = express.Router();

router.get('/', function(req, res) {
  res.render('login', {user: req.user});
});

router.post('/', passport.authenticate('local',
    {successReturnToOrRedirect: '/', failureRedirect: '/login'}));

module.exports = router;
