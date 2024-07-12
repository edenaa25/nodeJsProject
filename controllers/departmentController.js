const express = require("express")
const router = express.Router()
const depService = require("../services/departmentService")
const empService = require("../services/employeeService");
const userService = require("../services/userService");

//עובד
router.get("/:id", async (req, res) => {
    try{
        const id = req.params.id
        const employee = await depService.getDepById(id)
        return res.json(employee)
    }
    catch(e){
        res.status(500).send("Error get employee by id in: " + e.message)
    }
   
})

//עובד
router.get("/", async (req, res) => {
    try{
        const id = req.params.id
        const departmentsData = await depService.getAllDepDataEmp()
        return res.json(departmentsData)
    }
    catch(e){
        res.status(500).send("Error get all deparmnents: " + e.message)
    }
   
})

//עריכת מחלקה- עבד
router.put("/:id", async (req, res) => {
    try{
        
        const id = req.params.id
        const newData = req.body
        const status = await depService.editDep(id,newData)
        return res.json({status:status})
    }
    catch(e){
        res.status(500).send("Error update department in: " + e.message)
    }
   
})

//delete dep - עובד
router.delete("/:id", async (req, res) => {
    try{
        const id = req.params.id
        const status = await depService.deleteDep(id)
        return res.json({status:status})
    }
    catch(e){
        res.status(500).send("Error delete department in: " + e.message)
    }
   
})


//עובד
router.post("/", async (req, res) => {
    try{
        const newData = req.body
        const status = await depService.newDep(newData)
        return res.json({status:status})
    }
    catch(e){
        res.status(500).send("Error add department in: " + e.message)
    }
})

module.exports = router