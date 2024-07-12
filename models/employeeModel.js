const mongoose = require("mongoose")

const employeeSchema = new mongoose.Schema({
    fname: String,
    lname: String,
    startWork:{ type: Date, default: Date.now },
    departmentId:String,
    shifts:[String] //array of shits ID
}, { versionKey: false }); // Disable versioning


const model = mongoose.model("employee", employeeSchema)

module.exports = model