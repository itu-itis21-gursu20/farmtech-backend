const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Mineral analizi için öğe şeması
const analysisItemSchema = new Schema({
    maxValue: { type: Number, required: true },
    minValue: { type: Number, required: true },
    mineral: { type: String, required: true },
    value: { type: Number, required: true }
});

// Yaprak Analizi için ana şema
const leafAnalysisSchema = new Schema({
    land_id: { type: Schema.Types.ObjectId, ref: 'SharedLand'},
    analysisItems: [analysisItemSchema],
    dateCreated: { type: Date, default: Date.now },
    successRate: { type: Number, required: true }
});

// Modeli 'LeafAnalysis' adıyla dışa aktar
const LeafAnalysis = mongoose.model('LeafAnalysis', leafAnalysisSchema);

module.exports = LeafAnalysis;
