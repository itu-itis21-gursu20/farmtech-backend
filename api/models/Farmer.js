const mongoose = require("mongoose");

const FarmerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        required: false, // TODO: false olucak
    },
    phoneNumber: {
        type: String,
        required: true,
        unique: true,
    }
},
{
    timestamps: true
}
)

module.exports = mongoose.model("Farmer", FarmerSchema);