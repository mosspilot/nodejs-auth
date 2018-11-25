const express = require('express');
const router = express.Router();
const ensureLoggedIn = require('connect-ensure-login').ensureLoggedIn;

router.get('/', ensureLoggedIn('/login'), function(req, res) {
  res.render('account', {user: req.user});
});

module.exports = router;
