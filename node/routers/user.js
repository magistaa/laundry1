const { response } = require("express")
const express = require("express")
const app = express()

//membaca rqst dari body dgn tipe json
app.use(express.json())

//memanggil models
const models = require("../models/index")

//memanggil model "member"
const user = models.user

const md5 = require('md5')


// auth_verify
// const verify = require("./auth")
// app.use(verify)

//endpoint for get all member
app.get("/", async (request, response) => {
    let dataUser = await user.findAll()

    return response.json(dataUser)
})

//endpoint add new member
app.post("/", (request, response) => {
    let newUser = {
        nama: request.body.nama,
        username: request.body.username,
        password: md5(request.body.password),
        role: request.body.role
    }
     user.create(newUser)
     .then(result => {
         response.json({
             message: 'Data berhasil ditambahkan'
         })
     })
     .catch(error => {
         response.json ({
             messsage: error.message
         })
     })

})

//endpoint update 
app.put("/:id_user", async (request, res)=> {
    
        // put data
        let data = {
            id_user: request.body.id_user,
            nama: request.body.nama,
            username: request.body.username,
            password:request.body.password,
            role: request.body.role
        }
    
        let param = {
            id_user: request.params.id_user
        }
    
        user.update(data, {where: param})
        .then(result => {
            res.json({
                message: "Data updated",
                data: result
            })
        })
        .catch(error => {
            res.json({
                message: error.message
            })
        })

    
})
//endpoint delete 
app.delete("/:id_user", async (request, response) => {
    let param = {
        id_user: request.params.id_user
    }
    user.destroy({where: param})
    .then(result => {
        response.json({
            message: "Data Deleted",
            data: result
        })
    })
    .catch( error => {
        response.json({
            message: error.message
        })
    })
})


module.exports = app