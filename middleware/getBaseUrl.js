const dotenv = require('dotenv')

dotenv.config();

function getBaseUrl(){
    return process.env.NODE_ENV === "production" ? "https://vuclasssearch.herokuapp.com" : "http://localhost:3000"
}

module.exports = getBaseUrl;