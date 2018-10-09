var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');
var crypto = require('crypto');
var jwt = require('jsonwebtoken');
var secret = require('../config').secret;

/**
 * User Schema
 * created by gstone
 */

// Params
var UserSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    email: {type: String, unique: true, required: [true, "can't be blank"], index: true},
    status: String,
    username: {type: String, lowercase: true, unique: true, required: [true, "can't be blank"], match: [/^[a-zA-Z0-9]+$/, 'is invalid'], index: true},
    hash: String,
    salt: String,
    program: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Program' }],
    location: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Location', index: true}]
});

UserSchema.plugin(uniqueValidator, {message: 'is already taken.'});

// Methods

UserSchema.methods.toJSONAuth = function (){
    return {
        username: this.username,
        token: this.generateJWT(),
        firstName: this.firstName,
        lastName: this.lastName,
        email: this.email,
        status: this.status
    };
};

UserSchema.methods.toJSONInfo = function (){
    return {
        username: this.username,
        firstName: this.firstName,
        lastName: this.lastName,
        email: this.email,
        status: this.status
    };
};

UserSchema.methods.validPassword = function(password) {
    var hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
    return this.hash === hash;
};

UserSchema.methods.setPassword = function(password){
    this.salt = crypto.randomBytes(16).toString('hex');
    this.hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
};

UserSchema.methods.generateJWT = function() {
    var today = new Date();
    var exp = new Date(today);
    exp.setDate(today.getDate() + 60);

    return jwt.sign({
        id: this._id,
        username: this.username,
        exp: parseInt(exp.getTime() / 1000),
    }, secret);
};

// Model
mongoose.model('User', UserSchema);