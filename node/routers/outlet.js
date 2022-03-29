const { response } = require("express")
const express = require("express")
const app = express()

//membaca rqst dari body dgn tipe json
app.use(express.json())

//memanggil models
const models = require("../models/index")

//memanggil model "member"
const outlet = models.outlet

// auth_verify
// const verify = require("./auth")
// app.use(verify)

//endpoint for get all member
app.get("/", async (request, response) => {
    let dataOutlet = await outlet.findAll()

    return response.json(dataOutlet)
})

//endpoint add new member
app.post("/", (request, response) => {
    let newOutlet = {
        nama: request.body.nama,
        alamat: request.body.alamat
        
    }
     outlet.create(newOutlet)
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
app.put("/:id_outlet", async (request, res)=> {
    
        // put data
        let param = {
            id_outlet: request.params.id_outlet
        }

        let data = {
            id_outlet: request.body.id_outlet,
            nama: request.body.nama,
            alamat: request.body.alamat
        }
    
        outlet.update(data, {where: param})
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
app.delete("/:id_outlet", async (request, response) => {
    let param = {
        id_outlet: request.params.id_outlet
    }
    outlet.destroy({where: param})
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