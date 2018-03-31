var express = require('express');
var router = express.Router();
var config = require('../config.json');
// Middleware to check if user logged in
var auth = require('../auth/auth');
var DB = require('../db/db');
var db = new DB();

// Display login page
router.get('/', auth, function (req, res, next) {
    // User logged in
    if (req.auth) {
        res.render('mainview');
    }
    else {
        // No user logged in
        res.redirect('/login');
    }
})

module.exports = router;
