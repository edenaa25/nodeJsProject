// const userModel = require("../models/userModel")

// const updateUserActions = async(userId)=>{ //userId will save in seassion
//     const user = getUserById(userId)
//     let currentDate = new Date().toLocaleDateString(); // 6/17/2022  
//     console.log(currentDate)
//     if(currentDate=== user.lastActionDate){
//         if(user.currentActions === 0){
//             return "no more actions for today"
//         }
//         else{
//             await userModel.findByIdAndUpdate(userId,  { currentActions: user.currentActions-1 } )
//             return "reducing by one action"

//         }
//     }
//     else{
//         await userModel.findByIdAndUpdate(userId,  { currentActions: user.actions , lastActionDate:currentDate } )
//         return "Reset actions"
//     }
// }

// module.exports = {updateUserActions}

const jwt = require("jsonwebtoken");
const userModel = require("../models/userModel");
const secretKey = "my-secret-key";

const checkAndUpdateActions = async (req, res, next) => {
    const token = req.headers['authorization'];
    if (!token) {
        return res.status(401).send("Access Denied");
    }

    try {
        const verified = jwt.verify(token, secretKey);
        const userId = verified.id;

        const user = await userModel.findOne({ userId });
        let currentDate = new Date().toLocaleDateString();

        if (currentDate !== user.lastActionDate) {
            user.currentActions = user.actions; // Reset actions for new day
            user.lastActionDate = currentDate;
            await user.save();
        }

        if (user.currentActions === 0) {
            return res.status(403).send("No more actions available for today");
        }

        user.currentActions -= 1;
        await user.save();

        req.user = verified;
        next();
    } catch (err) {
        return res.status(400).send("Invalid Token");
    }
};

module.exports = checkAndUpdateActions;