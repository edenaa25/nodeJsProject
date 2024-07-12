const employeeModel = require("../models/employeeModel")

const shiftService = require("../services/shiftsService")
const depService = require("../services/departmentService")

const getAllEmp =async ()=>{
    const allEmp = await employeeModel.find({})
    return allEmp
}

//return employee data and shift data for employee edit page
const getEmpById = async(id)=>{
    const emp = await employeeModel.findById(id)
    const shifts = await Promise.all(emp.shifts.map(async shiftId => {
        return await shiftService.getShiftById(shiftId);
    }));

    return {...emp._doc,shifts}
}


//return all emolyees full names + department name + shifts (date + time)
const getAllEmpData = async () => {
    const allEmp = await getAllEmp();
    const empData = await Promise.all(allEmp.map(async emp => {        
        const dep = await depService.getDepById(emp.departmentId);
        const shifts = await Promise.all(emp.shifts.map(async shiftId => {
            return await shiftService.getShiftById(shiftId);
            
        }));
                
        return {
            employee: emp,
            department: dep?.name,
            shifts
        };
    }));
    
    return empData;
}

const editEmp= async(id,newData)=>{
    await employeeModel.findByIdAndUpdate(id,newData)
    return "Updated"
}

const deleteEmp = async(id)=>{
    await employeeModel.findByIdAndDelete(id)
    return "Deleted"
}

const newEmp = async(emp)=>{
    const newEmp = new employeeModel(emp) // {_id, name, director, premiered}
    await newEmp.save()
    return "Created"
}


//edit department id for employee
const addDepIdForEmp = async(empId , depId)=>{
      await employeeModel.findByIdAndUpdate(empId, { departmentId: depId })
      return "Department ID added to employee"
}

//add shift to emp from "edit employee" page"
const addShiftToEmp = async (empId, shiftId) => {
    await employeeModel.findByIdAndUpdate(empId, { $push: { shifts: shiftId } })
    return "Shift ID added to employee"
}


module.exports = {deleteEmp,editEmp,getAllEmpData,getEmpById,getAllEmp,newEmp,addDepIdForEmp,addShiftToEmp}



