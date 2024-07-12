const mongoose = require("mongoose")

const departmentSchema = new mongoose.Schema({
    name: String,
    managerId: String,
}, { versionKey: false }); // Disable versioning


const model = mongoose.model("department", departmentSchema)

module.exports = model