var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');

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
    password: String,
    program: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Program' }],
    location: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Location' }]
});

UserSchema.plugin(uniqueValidator, {message: 'is already taken.'});

// Methods

UserSchema.methods.toJSON = function (){
    return {
        firstName: this.firstName,
        lastName: this.lastName,
        email: this.email,
        status: this.status,
        username: this.username,
        program: this.program.title,
        location: this.location.name
    };
};

// Model
mongoose.model('User', UserSchema);