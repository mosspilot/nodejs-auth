const express = require('express');
const passport = require('passport');
const Account = require('../models/account');
const router = express.Router();

router.get('/', function(req, res) {
    res.render('login', { user : req.user });
});

router.post('/', passport.authenticate('local'), function(req, res) {
    res.redirect('/');
});

module.exports = router;