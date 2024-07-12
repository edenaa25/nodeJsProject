const jfile= require ('jsonfile')
const userService = require('../services/userService')
const path = require('path'); // Import the path module


const FILE = path.join(__dirname, '../data_files/logFile.json')

const addLofToFile = async(req, res , next)=>{
    const userId = req.user.id;
    const user = await userService.getUserById(userId)
    if(user){
        
        let currentDate = new Date();

        let day = currentDate.getDate();
        let month = currentDate.getMonth() + 1; // January is 0, so we add 1
        let year = currentDate.getFullYear();

        let formattedDate = `${day}.${month}.${year}`;

        const newLog= {id:user.id , maxActions: user.actions , date: formattedDate , actionAllowd: user.currentActions }

        const data = await jfile.readFile(FILE)
        console.log(data)

        let actions=[...data.actions]
        actions.push(newLog)

        await jfile.writeFile(FILE, {actions})
        console.log("log added to logs file")
        next();
    }

}

module.exports = { addLofToFile };