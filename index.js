const express = require("express")
const app = express()
const mongoose = require("mongoose")
const { authenticateJWT, checkAndUpdateActions } = require("./middleware/authMiddleware");
const {addLofToFile} = require ('./middleware/handleLogs')

mongoose.connect("mongodb://127.0.0.1:27017/NodeJsProject").then(() => console.log("Connected to Db..."))

// parse incoming request body from JSON -> JS OBJECT
app.use(express.json())

const loginController = require("./controllers/loginController")
app.use("/", loginController)

const userController = require("./controllers/userController")
app.use("/users", authenticateJWT, checkAndUpdateActions,addLofToFile, userController)

const employeeController = require("./controllers/employeeController")
// app.use("/employees", employeeController)
app.use("/employees", authenticateJWT, checkAndUpdateActions,addLofToFile, employeeController);

const departmentController = require("./controllers/departmentController")
app.use("/department", authenticateJWT, checkAndUpdateActions,addLofToFile, departmentController)

const shiftsController = require("./controllers/shiftsController")
app.use("/shifts", authenticateJWT, checkAndUpdateActions, addLofToFile,shiftsController)

app.listen(8000, () => {
    console.log("Server is listening on port 8000")
})