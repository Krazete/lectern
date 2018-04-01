var express = require('express');
var router = express.Router();
var config = require('../config.json');
// Middleware to check if user logged in
var auth = require('../auth/auth');
var DB = require('../db/db');
var db = new DB();

// Save user uploaded video
router.post('/upload/:userid', auth, async (req, res, next) => {
    // No user logged in
    if (!req.auth) {
        res.status(400).send("Unauthorized");
    }
    else {
        // User logged in
        console.log(req.body);
        let userid = req.params.userid;
        let video = req.body.video;
        try {
            await db.init();
            await db.uploadVideo(video);
            res.send(video.size);
        }
        catch (err) {
            console.log(err);
            res.status(500).send("Error saving video");
        }
    }
})

module.exports = router;