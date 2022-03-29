const express = require ("express")
const login = express()
 
// middleware for allow the request from body
login.use(express.json())
 
// membuat variable md5
const md5 = require('md5')
 
// mebuat variable jwt 
const jwt = require("jsonwebtoken")
 
// membuat secretkey
const secretKey = "underpresser"
 
// call models
const models = require("../models/index")
const user = models.user;
 
login.post("/",async (request,response) => {
    let newLogin = {
        username : request.body.username,
        password : md5(request.body.password),
    }
    let dataUser = await user.findOne({
        where : newLogin
    });
 
    if(dataUser){
        let payload = JSON.stringify(dataUser)
        let token = jwt.sign(payload,secretKey)
        return response.json({
            logged: true,
            data: dataUser,
            token: token
        })
    } else {
        return response.json({
            logged: false,
            message: `Invalid username or password`
        })
    }
})
 
 module.exports = login