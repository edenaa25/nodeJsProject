const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    name: String,
    actions: Number,
    userId: String,
    // currentActions: Number,
    // lastActionDate: Date // to track the date of the last action
    currentActions: { type: Number, default: 0 }, // Actions remaining for the day, default to 0
    lastActionDate: { type: Date, default: Date.now } // Date and time of the last action, default to current timestamp
}, { versionKey: false }); // Disable versioning


const model = mongoose.model("user", userSchema)

module.exports = model