const dotenv = require('dotenv')

dotenv.config();

function getBaseUrl(client = true){
    return process.env.NODE_ENV === "production" ? "https://vuclasssearch.herokuapp.com" : client ? "http://localhost:3000" : "http://localhost:8080"
}

module.exports = getBaseUrl;