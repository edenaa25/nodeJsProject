const express = require("express")
const router = express.Router()
const empService = require("../services/employeeService")
const shiftService = require("../services/shiftsService")

//get all employees - עובד
router.get("/", async (req, res) => {
    try {
       const allEmployees = await empService.getAllEmpData()
       console.log('Employee Data:', JSON.stringify(allEmployees, null, 2));
        return res.json(allEmployees)
} catch (e) {
        res.status(500).send("Error get data employees in: " + e.message)
    }
})

//edit employee page - edit emplyee data or add shift for employee - by action value - עובד 
router.put("/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const { action, ...newData } = req.body;

        let status;

        if (action === "edit") {
            status = await empService.editEmp(id, newData);
        } else if (action === "addShift") {
            const { shiftId } = newData;
            status = await empService.addShiftToEmp(id, shiftId);
        } else {
            return res.status(400).json({ error: "Invalid action" });
        }

        return res.json({ status: status });
    } catch (e) {
        res.status(500).send("Error updating employee: " + e.message);
    }
});

//delete employee - עובד
router.delete("/:id", async (req, res) => {
    try{
        const id = req.params.id
        const status = await empService.deleteEmp(id)
        return res.json({status:status})
    }
    catch(e){
        res.status(500).send("Error delete employee in: " + e.message)
    }
   
})

//employee page - get data for one employee by id
router.get("/:id", async (req, res) => {
    try{
        const id = req.params.id
        const employee = await empService.getEmpById(id)
        return res.json(employee)
    }
    catch(e){
        res.status(500).send("Error get employee by id in: " + e.message)
    }
   
})

// עובד חדש- עובד תקין
router.post("/", async (req, res) => {
    try{
        const newData = req.body
        const status = await empService.newEmp(newData)
        return res.json({status:status})
    }
    catch(e){
        res.status(500).send("Error update employee in: " + e.message)
    }
})


module.exports = router