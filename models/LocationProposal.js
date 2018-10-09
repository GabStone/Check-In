var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');

/**
 * Location Proposal Schema
 * created by gstone
 */

// Params
var LocationProposalSchema = new mongoose.Schema({
    name: {type: String, unique: true, required: [true, "can't be blank"], index: true},
    description: String,
    address: String,
    image: String
});

LocationProposalSchema.plugin(uniqueValidator, {message: 'is already taken.'});

// Methods

LocationProposalSchema.methods.toJSON = function() {
    return {
        title: this.title,
        description: this.description
    };
};

// Model
mongoose.model('LocationProposal', LocationProposalSchema);