const mongoose = require("mongoose")

const shiftSchema = new mongoose.Schema({
    date: Date,
    startHour: Number,
    endingHour: Number
}, { versionKey: false }); // Disable versioning



const model = mongoose.model("shift", shiftSchema)

module.exports = model