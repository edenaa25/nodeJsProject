const depModel = require("../models/departmentModel")
const employeeModel = require("../models/employeeModel")

const empService = require("../services/employeeService")

const getDepById = async(id)=>{
    const dep = await depModel.findById(id)
    // console.log(dep)
    return dep
}

const getAllDep = async()=>{
    return await depModel.find({})
}


const getAllDepDataEmp = async () => {
    // Fetch all departments
    const allDep = await getAllDep();
    
    // For each department, fetch related data
    const allDepEmp = await Promise.all(allDep.map(async dep => {
        // Fetch all employees with the department's ID
        const depEmployees = await employeeModel.find({ departmentId: dep._id });
        
        // Fetch the manager's details
        const depManager = await employeeModel.findById(dep.managerId)
        
        // Return department data along with employees and manager's name
        return {
            ...dep._doc, // Spread department data
            employees: depEmployees,
            manager: depManager ? `${depManager.fname} ${depManager.lname}` : "No Manager"
        };
    }));
    
    return allDepEmp;
}

const editDep = async(id,newData)=>{
    await depModel.findByIdAndUpdate(id,newData)
    return "Updated"
}


const deleteDep = async(id)=>{
    // await empService.deleteDepId(id) //delete depId for employees
    await employeeModel.updateMany({ departmentId: id }, { $unset: { departmentId: "" } }) // Unset the departmentId for employees with the given depId
    await depModel.findByIdAndDelete(id)
    return "Deleted"
}

const newDep = async(dep)=>{
    const newDep = new depModel(dep) 
    await newDep.save()
    return "Created"
}

module.exports = { getDepById, getAllDep, getAllDepDataEmp, editDep, deleteDep, newDep }
