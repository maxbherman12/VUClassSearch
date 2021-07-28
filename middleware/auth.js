const jwt           = require('jsonwebtoken')
const dotenv        = require('dotenv')
const getBaseUrl    = require('../middleware/getBaseUrl')

dotenv.config();

function auth(req, res, next){
    const token = req.cookies.token;

    if(!token){
        res.status(401).json({msg: "Access denied. No token provided"})
    }
    try{
        const decodedUser = jwt.verify(token, process.env.JWT_SECRET)
        req.user = decodedUser.user
        next()
    }catch(err){
        res.redirect(`${getBaseUrl()}`)
        res.clearCookie("token")
        res.status(400).send("Token is not valid")
    }
}

module.exports = auth;