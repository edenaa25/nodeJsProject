const express = require("express")
const router = express.Router()
const userService = require("../services/userService")


router.get("/", async (req, res) => {
    try{
        const users = await userService.getUsersData()
        return res.json(users)
    }
    catch(e){
        res.status(500).send("Error get users: " + e.message)

    }

})

module.exports = router