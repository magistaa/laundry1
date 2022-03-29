const { response } = require("express")
const express = require("express")
const app = express()

//membaca rqst dari body dgn tipe json
app.use(express.json())

//memanggil models
const models = require("../models/index")

//memanggil model "paket"
const paket = models.paket

// auth_verify
// const verify = require("./auth")
// app.use(verify)

//endpoint for get all member
app.get("/", async (request, response) => {
    let dataPaket = await paket.findAll()

    return response.json(dataPaket)
})

//endpoint add new member
app.post("/", (request, response) => {
    let newPaket = {
        jenis: request.body.jenis,
        harga: request.body.harga
    }
     paket.create(newPaket)
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
app.put("/:id_paket", async (request, res)=> {

        // put data
        let data = {
            id_paket: request.body.id_paket,
            jenis: request.body.jenis,
            harga: request.body.harga
        }
    
        let param = {
            id_paket: request.params.id_paket
        }
    
        paket.update(data, {where: param})
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
app.delete("/:id_paket", async (request, response) => {
    let param = {
        id_paket: request.params.id_paket
    }
    paket.destroy({where: param})
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