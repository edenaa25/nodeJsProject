const express = require("express")
const router = express.Router()
const userService = require("../services/userService")


router.post("/login", async (req, res) => {
    try {
        const { username, email } = req.body;
        const result = await userService.checkUserReg(username, email);
        if (result.token) {
            res.status(200).send(result);
        } else {
            res.status(400).send(result);
        }
    } catch (e) {
        res.status(500).send("Error logging in: " + e.message);
    }
});


module.exports = router