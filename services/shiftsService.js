const { findByIdAndUpdate } = require("../models/departmentModel")
const shiftModel = require("../models/shiftModel")
const empService = require("../services/employeeService")

const getAllShifts = async()=>{
    return shiftModel.find({})
}

const getShiftById = async(id)=>{
        const shift = await shiftModel.findById(id)
        // console.log(shift)
        return shift
}

const getShiftsByEmpId= async(id)=>{
    const getEmp = await empService.getEmpById(id)
    const empShiftsIds = getEmp.shifts
    const empShiftsData = await Promise.all(empShiftsIds.map(shiftId => getShiftById(shiftId))) // Use Promise.all to resolve all promises
    return empShiftsData
    
}

const editShift = async(id,newData)=>{
    await shiftModel.findByIdAndUpdate(id,newData)
    return "Shift Updated"
}

const newShift = async(shift)=>{
    const newShift = new shiftModel(shift) // {_id, name, director, premiered}
    await newShift.save()
    return "Shift Created"
}
module.exports = {getShiftById,getShiftsByEmpId,getAllShifts,editShift,newShift}
