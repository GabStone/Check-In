var bodyParser = require('body-parser');
var multer = require('multer');
var upload = multer();
var MongoClient = require('mongodb').MongoClient;
var mongoose = require('mongoose');
const express = require('express');
var passport = require('passport');
var index = require('./config/index');

const app = express();

// Models
require('./models/User');
require('./models/Program');
require('./models/Location');
require('./models/LocationProposal');
require('./models/Faculty');
require('./config/passport');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(require('./routes'));

// Mongoose DB Connection
var connectionString = 'mongodb://' + index.mongoDB_username + ':' + index.mongoDB_password + '@' + index.mongoDB_host + ':' + index.mongoDB_port +'/' + index.mongoDB_schema;
mongoose.connect(connectionString, { autoIndex: false });

// Winston Logger
var logger = require('./log/logger');
logger.info("Logger Started");

// Starting Server
logger.info('Server Starting...');
var server = app.listen(index.port, function () {
	logger.info('Server Started on 127.0.0.1');
	logger.info('Listening on port ' + server.address().port);
});