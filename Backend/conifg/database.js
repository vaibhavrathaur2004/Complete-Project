const mongoose = require('mongoose')
require("dotenv").config()

exports.dbconnection =() => {
    mongoose.connect(process.env.MONGODB_URL)
    .then(()=>{
        console.log("Database Connectd Successfully ✅");
        
    })
    .catch((error)=>{
        console.log("Something wen wrong ❌ ");
        process.exit(1)
    })
}
// module.exports = dbconnection;