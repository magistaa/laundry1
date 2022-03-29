const { response } = require("express")
const express = require("express")
const app = express()

//membaca rqst dari body dgn tipe json
app.use(express.json())

//memanggil models
const models = require("../models/index")

//memanggil model "member"
const transaksi = models.transaksi

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
        tgl: request.body.tgl,
        batas_waktu: request.body.batas_waktu,
        tgl_bayar:request.body.tgl_bayar,
        id_user: request.body.id_user,
        id_member: request.body.id_member,
        id_outlet: request.body.id_outlet,
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
app.put("/:id_transaksi", async (request, res)=> {
    
        // put data
        let data = {
            id_transaksi: request.body.id_transaksi,
            tgl: request.body.tgl,
            batas_waktu: request.body.batas_waktu,
            tgl_bayar:request.body.tgl_bayar,
            id_user: request.body.id_user,
            id_member: request.body.id_member,
            id_outlet: request.body.id_outlet,
        }
    
        let param = {
            id_transaksi: request.params.id_transaksi
        }
    
        transaksi.update(data, {where: param})
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
app.delete("/:id_transaksi", async (request, response) => {
    let param = {
        id_transaksi: request.params.id_transaksi
    }
    transaksi.destroy({where: param})
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