var mongoose = require('mongoose');

/**
 * Program Schema
 * created by gstone
 */

// Params
var ProgramSchema = new mongoose.Schema({
    title: String,
    description: String,
    type: String,
    duration: Number,
    faculty: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Faculty' }]
});

// Methods

ProgramSchema.methods.toJSON = function () {
    return {
        title: this.title,
        description: this.description,
        type: this.type,
        duration: this.duration
    };
};

// Model
mongoose.model('Program', ProgramSchema);
