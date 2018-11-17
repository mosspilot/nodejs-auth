const express = require('express');
const passport = require('passport');
const Account = require('../models/account');
const router = express.Router();

router.get('/', function(req, res) {
  res.render('register', { });
});

router.post('/', function(req, res) {
  Account.register(
      new Account(
          {username: req.body.username}), req.body.password, function(err, account) {
        if (err) {
          return res.render('register', {account: account});
        }

        passport.authenticate('local')(req, res, function() {
          res.redirect('/');
        });
      });
});

module.exports = router;
