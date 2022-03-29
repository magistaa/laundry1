const { response } = require("express")
const express = require("express")
const app = express()

//membaca rqst dari body dgn tipe json
app.use(express.json())

//memanggil models
const models = require("../models/index")

//memanggil model "member"
const member = models.member

// auth_verify
// const verify = require("./auth")
// app.use(verify)

//endpoint for get all member
app.get("/", async (request, response) => {
    let dataMember = await member.findAll()

    return response.json(dataMember)
})

//endpoint add new member
app.post("/", (request, response) => {
    let newMember = {
        name: request.body.name,
        alamat: request.body.alamat,
        jenis_kelamin:request.body.jenis_kelamin,
        tlp: request.body.tlp
        
    }
     member.create(newMember)
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
app.put("/:id_member", async (request, res)=> {

        // put data

        let param = {
            id_member: request.params.id_member
        }

        let data = {
            id_member: request.body.id_member,
            name: request.body.name,
            alamat: request.body.alamat,
            jenis_kelamin:request.body.jenis_kelamin,
            tlp: request.body.tlp
        }
    
       
        member.update(data, {where: param})
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
app.delete("/:id_member", async (request, response) => {
    let param = {
        id_member: request.params.id_member
    }
    member.destroy({where: param})
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