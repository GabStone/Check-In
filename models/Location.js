var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');

/**
 * Location Schema
 * created by gstone
 */

// Params
var LocationSchema = new mongoose.Schema({
    name: {type: String, unique: true, required: [true, "can't be blank"], index: true},
    description: String,
    address: String,
    image: String
});

LocationSchema.plugin(uniqueValidator, {message: 'is already taken.'});

// Methods

LocationSchema.methods.toJSON = function () {
    return {
        name: this.name,
        description: this.description,
        address: this.address,
        image: this.image
    };
};

// Model
mongoose.model('Location', LocationSchema);