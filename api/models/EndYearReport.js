const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create a schema for the endYearReport
const endYearReportSchema = new Schema({
    land_id: { type: Schema.Types.ObjectId, ref: 'SharedLand' },
    dateCreated: { type: Date, default: Date.now },
    description: { type: String, default: '' },
    title: { type: String, required: true }
});

// Create a model from the schema
const EndYearReport = mongoose.model('EndYearReport', endYearReportSchema);

module.exports = EndYearReport;
