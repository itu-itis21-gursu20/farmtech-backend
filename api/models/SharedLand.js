const mongoose = require("mongoose");

const SharedLandSchema = new mongoose.Schema({

    dateCreated: { type: Date, default: Date.now },

    parcel: { type: String, required: true },

    products: {
      type: Map,
      of: {
        name: { type: String, default: '' },
        quantity: { type: Number, default: 0 }
      }
    },

    title: { type: String, required: true },

    // TODO: mapUrl ekle
    mapUrl: { type: String },
    
    numList: [{ type: String }]

  }, {
    timestamps: true
  }
)

module.exports = mongoose.model("SharedLand", SharedLandSchema);