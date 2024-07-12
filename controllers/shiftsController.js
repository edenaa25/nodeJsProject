const express = require("express")
const router = express.Router()
const shiftsService = require("../services/shiftsService")
const employeeService = require("../services/employeeService")

//עובד
router.get("/", async(req,res)=>{
    try{
        const allShifts =await shiftsService.getAllShifts()
        return res.json(allShifts)
    }
    catch(e){
        res.status(500).send("Error get shifts : " + e.message)

    }
})

//עובד
router.post("/", async (req, res) => {
    try{
        const newData = req.body
        const status = await shiftsService.newShift(newData)
        return res.json({status:status})
    }
    catch(e){
        res.status(500).send("Error add shifts in: " + e.message)
    }
})

//עובד
router.put("/:id", async (req, res) => {
    try{
        const id = req.params.id
        const {action , ...newData} = req.body
        let status;

        if(action==='editShift'){
            status = await shiftsService.editShift(id,newData)           
        }
        else if (action==='addEmployee'){
            status = await employeeService.addShiftToEmp(newData.empId,id)
        }
        else {
            return res.status(400).json({ error: "Invalid action" });
        }
       
        return res.json({ status: status });

    }
    catch(e){
        res.status(500).send("Error update shift in: " + e.message)
    }
   
})

module.exports = router