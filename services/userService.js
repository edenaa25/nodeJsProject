const regRep = require("../repositories/usersRep")
const userModel = require("../models/userModel")
const jwt = require("jsonwebtoken");

const SECRET_KEY = 'my_secret_key'; 

const getUserById = async(id)=>{
    const user = await userModel.findById(id)
    return user
}



const checkUserReg = async(username,email) => {
    try{
        const {data : allUsers} = await regRep.getAllUsers()
        const user = allUsers.find(user=> user.username===username && user.email===email)
        if (user) {
            const getUserFromDb = await userModel.findOne({userId : user.id})
            const token = jwt.sign({ id: getUserFromDb._id, name: getUserFromDb.name }, SECRET_KEY, { expiresIn: '1d' });
            return { token };
        } else {
            return { status: "error", message: "User does not exist" };
        }
    }
   catch(e){
    return { status: "error", message: "User from placeholder DB error: " + e.message }
   }

}

const updateUserActions = async (userId) => {
    const user = await getUserById(userId);
    let currentDate = new Date();

    let day = currentDate.getDate();
    let month = currentDate.getMonth() + 1; // January is 0, so we add 1
    let year = currentDate.getFullYear();

    let formattedDate = `${day}.${month}.${year}`;

     day = user.lastActionDate.getDate();
     month = user.lastActionDate.getMonth() + 1; // January is 0, so we add 1
     year = user.lastActionDate.getFullYear();

    let userFormattedDate = `${day}.${month}.${year}`;

    if (formattedDate !== userFormattedDate) {
        user.currentActions = user.actions;
        user.lastActionDate = currentDate;
    }

    if (user.currentActions === 0) {
        return false; // No more actions for today
    } else {
        user.currentActions -= 1;
        // console.log(user.currentActions)
        await user.save();
        return true; // Action permitted
    }
};

const getUsersData = async()=>{
    const users = await userModel.find({})
    return users
}

module.exports = {checkUserReg,getUsersData,updateUserActions,getUserById}