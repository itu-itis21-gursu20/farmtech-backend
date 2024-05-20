const mongoose = require("mongoose");

const EngineerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        required: false, // TODO: false
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

module.exports = mongoose.model("Engineer", EngineerSchema);