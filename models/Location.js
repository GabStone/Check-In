var mongoose = require('mongoose');

/**
 * Location Schema
 * created by gstone
 */

// Params
var LocationSchema = new mongoose.Schema({
    name: String,
    description: String,
    address: String,
    image: String
});

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