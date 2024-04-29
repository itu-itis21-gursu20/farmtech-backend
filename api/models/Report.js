const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create a schema for the Report
const reportSchema = new Schema({
    land_id: { type: Schema.Types.ObjectId, ref: 'SharedLand'},
    dateCreated: { type: Date, default: Date.now },
    description: { type: String, default: '' },
    title: { type: String, required: true },
    imageUrl: [{ type: String }] // An array of strings to store the URLs
});

// Create a model from the schema
const Report = mongoose.model('Report', reportSchema);

module.exports = Report;
