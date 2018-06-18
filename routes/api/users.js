var bodyParser = require('body-parser');
var multer = require('multer'); // v1.0.5
const mongoose = require('mongoose');
var User = mongoose.model('User');
var Program = mongoose.model('Program');
var upload = multer(); // for parsing multipart/form-data
var router = require('express').Router();
var async = require("async");
var logger = require('winston');

/**
 * register API
 * Creates a User model and saves it to the database
 */
router.post('/user', async (req, res) => {
    logger.info("Registration Api");

    var user = new User();
    user.firstName = req.body.user.firstName;
    user.lastName = req.body.user.lastName;
    user.email = req.body.user.email;
    user.username = req.body.user.username;
    user.password = req.body.user.password;
    logger.info("Created ");

    var program = new Program();
    program.title = req.body.program.title;
    program.description = req.body.program.description;
    program.type = req.body.program.type;
    program.duration = req.body.program.duration;

    let p = await program.save();

    console.log(p);
    user.program = p._id;

    user.save(function (err) {
        if (err) {
            // TODO handle Errors
            console.log("error while saving");
            console.log(err.errors);
            res.json({"result" : -1, "msg" : err.errors});
        } else {
            res.json({"result": 0, "username": user.username});
        }
    });
});


router.post('/find', async (req, res) => {
    console.log("find API");

    let user = await User.findOne({"username": req.body.user.username});
    console.log(user._id);
    let program = await Program.findById(user.program);

    console.log(program);
    res.send(user.toJSON());
});

// Export users route
module.exports = router;