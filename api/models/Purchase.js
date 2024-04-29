const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create a schema for PurchaseItem, which will be embedded in the Purchase schema
const purchaseItemSchema = new Schema({
    brand: { type: String, required: true },
    quantity: { type: Number, required: true },
    totalPrice: { type: Number, required: true },
    unitPrice: { type: Number, required: true }
}, { _id: false }); // _id is set to false because these will be subdocuments

// Create a schema for the Purchase
const PurchaseSchema = new Schema({
    land_id: { type: Schema.Types.ObjectId, ref: 'SharedLand' },
    approved: { type: Boolean, default: false },
    dateCreated: { type: Date, default: Date.now },
    description: { type: String, default: '' },
    time: { type: String, required: true },
    purchaseItems: [purchaseItemSchema]
});


module.exports = mongoose.model("Purchase", PurchaseSchema);