var mongoose = require('mongoose');

/**
 * Faculty Schema
 * created by gstone
 */

// Params
var FacultySchema = new mongoose.Schema({
    title: String,
    description: String,
    location: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Location' }]
});

// Methods

FacultySchema.methods.toJSON = function() {
    return {
        title: this.title,
        description: this.description
    };
};

// Model
mongoose.model('Faculty', FacultySchema);
