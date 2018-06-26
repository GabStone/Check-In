var bodyParser = require('body-parser');
var multer = require('multer'); // v1.0.5
const mongoose = require('mongoose');
var User = mongoose.model('User');
var Program = mongoose.model('Program');
var upload = multer(); // for parsing multipart/form-data
var router = require('express').Router();
var async = require("async");
var logger = require('../../log/logger');
var passport = require('passport');
var auth = require('../auth');

// TODO Add privilege Service

/**
 * registerAccount API
 * Creates a User model and saves it to the database
 */
router.post('/registerAccount', async (req, res) => {
    logger.info("Register Account");

    var user = new User();

    logger.info("Creating account...");
    user.email = req.body.user.email;
    user.username = req.body.user.username;
    user.firstName = req.body.user.firstName;
    user.lastName = req.body.user.lastName;
    user.setPassword(req.body.user.password);
    logger.info("Account created...");

    logger.info("Starting save...");
    user.save(function (err) {
        if (err) {
            logger.error("Error while saving");
            res.json({"result" : -1, "msg" : err.errors});
        } else {
            logger.info("Account created and save, Username : " + user.username);
            res.json({"result": 0, "username": user.username});
        }
    });
});

/**
 * getAccountInfo API
 * Find account by username and return account info
 * Admin API TODO add special privilege, not sure if this API will be used
 */
router.post('/getAccountInfo', auth.required, async (req, res) => {
    logger.info("Get Account Info");

    logger.info("Finding account with username : " + req.body.user.username);
    let user = await User.findOne({"username": req.body.user.username});
    if (user != null) {
        logger.info("Found account with ID : " + user._id);
        res.send({"result": 0, "message" : "Account Found", "user": user.toJSONInfo()});
    } else {
        logger.info("No Account Found");
        res.send({"result": -1, "message": "Account Not Found"});
    }
});


/**
 * login API
 * Passport Authentication
 */
router.post('/login', function(req, res, next){
    logger.info("Login API");

    logger.info("Checking Email");
    if (!req.body.user.email) {
        logger.error("Blank Email");
        return res.send({"result": -1, "message": "Email can't be blank"});
    }

    logger.info("Checking Password");
    if (!req.body.user.password) {
        logger.error("Blank Password");
        return res.send({"result": -1, "message": "Password can't be blank"});
    }

    logger.info("Starting Authentication...");
    passport.authenticate('local', {session: false}, function(err, user, info) {
        if(err){ return next(err); }

        if (user) {
            logger.info("Authentication Success");
            return res.json({result: 0, user: user.toJSONAuth()});
        } else {
            logger.info("Authentication Failed");
            return res.json({result: -1, message: "Authenication Failed - Incorrect Username/Password"});
        }
    })(req, res, next);
});


/**
 * getMyAccountInfo API
 * Find account by logged in user and returns account info
 */
// TODO Create getMyAccountInfo API

/**
 * editMyAccount API
 * Find account by username and
 */
// TODO Create editMyAccount API

// Export users route
module.exports = router;