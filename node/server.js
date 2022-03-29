const express = require("express")
const app = express()
var cors = require('cors')
app.use(cors()) 

// panggil router member
const member = require("./routers/member")

app.use("/member", member)

// panggil router user
const user = require("./routers/user")

app.use("/user", user)

//panggil router paket
const paket = require("./routers/paket")

app.use("/paket", paket)

//panggil router transaksi
const transaksi = require("./routers/transaksi")

app.use("/transaksi", transaksi)

//panggil router outlet
const outlet = require("./routers/outlet")

app.use("/outlet", outlet)

//panggil router login
const login = require("./routers/login")

app.use("/login", login)

app.listen(8000,() =>{
    console.log('Server run on port 8000');
})