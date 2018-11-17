const express = require('express');
const passport = require('passport');
const Account = require('../models/account');
const router = express.Router();

router.get('/', function (req, res) {
    res.render('index', { user : req.user });
});

module.exports = router;
