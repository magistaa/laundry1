// mebuat variable jwt 
const jwt = require("jsonwebtoken")

// membuat secretkey
const secretKey = "underpresser"

const auth = (request, response, next) => {
    // kita dapatkan data authorization
    let header = request.headers.authorization
    // header = Bearer hofihdsofhfifhsdklfhisdgh
    
    // kita ambil data token nya
    let token = header && header.split(" ")[1]

    if(token == null){
        // jika token nya kosong
        return response.status(401).json({
            message: `Unauthorized`
        })
    }else{
        let jwtHeader = {
            algorithm: "HS256"
        }

        // verifikasi token yang diberikan
        jwt.verify(token, secretKey, jwtHeader, error => {
            if(error){
                return response.status(401).json({
                    message: `Invalid Token`
                })
            }else{
                next()
            }
        })
    }
}
module.exports = auth