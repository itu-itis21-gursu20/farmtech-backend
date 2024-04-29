const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Mineral analizi için öğe şeması
const analysisItemSchema = new Schema({
    maxValue: { type: Number, required: true },
    minValue: { type: Number, required: true },
    mineral: { type: String, required: true },
    value: { type: Number, required: true }
});

// Toprak Analizi için ana şema
const soilAnalysisSchema = new Schema({
    land_id: { type: Schema.Types.ObjectId, ref: 'SharedLand' },
    analysisItems: [analysisItemSchema],
    dateCreated: { type: Date, default: Date.now },
    successRate: { type: Number, required: true }
});

// Modeli 'SoilAnalysis' adıyla dışa aktar
const SoilAnalysis = mongoose.model('SoilAnalysis', soilAnalysisSchema);

module.exports = SoilAnalysis;
