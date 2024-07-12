const axios = require("axios")

const URL = 'https://jsonplaceholder.typicode.com/users';

const getAllUsers = ()=>{
   return axios.get(`${URL}`)
}

module.exports = {getAllUsers}