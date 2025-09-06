const mongoose = require('mongoose');

const foodpartnerSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
    },
    contactNumber:{
        type:Number,
    },
    address:{
        type:String,
    }
 },{timestamp:true})

module.exports = mongoose.model("FoodPartner", foodpartnerSchema);
