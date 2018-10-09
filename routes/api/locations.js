var bodyParser = require('body-parser');
var multer = require('multer'); // v1.0.5
const mongoose = require('mongoose');
var User = mongoose.model('User');
var Location = mongoose.model('Location');
var Program = mongoose.model('Program');
var LocationProposal = mongoose.model('LocationProposal');
var upload = multer(); // for parsing multipart/form-data
var router = require('express').Router();
var async = require("async");
var logger = require('../../log/logger');
var passport = require('passport');
var auth = require('../auth');

/**
 * proposeLocation API
 * Users will be allowed to propose new locations
 */
router.post('/locations/proposeLocation', auth.required, async (req, res) => {
    logger.info("Propose Location");

    var locationProposal = new LocationProposal();

    locationProposal.name = req.body.location.name;
    locationProposal.description = req.body.location.description;
    locationProposal.address = req.body.location.address;
    locationProposal.image = req.body.location.image;

    locationProposal.save(function (err) {
        if (err) {
            logger.error("Error while saving");
            res.json({"result" : -1, "msg" : err.errors});
        } else {
            logger.info("Location Proposal Created");
            res.json({"result": 0});
        }
    });
});

/**
 * checkedInUsers API
 * Returns all users currently "Checked-In" a specific location
 */
router.post('/locations/checkedInUsers', auth.required, async (req, res) => {
    logger.info("Checked In Users");

    logger.info("Finding location with name : " + req.body.location.name);
    let location = await Location.findOne({"name": req.body.location.name});

    if (location == null) {
        logger.info("Error no location found");
        return res.send({"result": -1, "message": "Location Not Found"});
    }

    logger.info("Location ID : " + location._id);
    logger.info("Location description : " + location.description);

    let users = await User.find({"location": location._id});

    if (users == null) {
        logger.info("No users found for location : " + location.name);
        return res.send({result: 0, message: "No Users Found"});
    }

    logger.info("Found " + users.length + " users checked in at " + location.name);

    let result = {};
    result.result = 0;
    result.location = location.name;
    result.users = [];
    for (var i = 0; i < users.length; i++) {
        result.users[i] = {"username": users[i].username, "status": users[i].status};
    }

    return res.send({"result": 0, result});
});

/**
 * getAllLocations API
 * Users will need to view all locations
 */
router.post('/locations/getLocations', auth.required, async (req, res) => {
    logger.info("Get All Locations");
});


// Export users route
module.exports = router;