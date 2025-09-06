const User = require("../models/User")
const FoodPartner = require('../models/Foodpartner')
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
require("dotenv").config();

// for usr
exports.register = async (req,res)=>{
    try{
       const {username  , email , password} = req.body;

       const existingUser = await User.findOne({email});

        if(existingUser){
            return res.status(400).json({
                success:false,
                message:"User already exists"
            })
        }

        const hashPassword = await bcrypt.hash(password,10);



        const user = await User.create({
            username,
            email,
            password:hashPassword,
        })

        const payload = {
            id : user._id,
        }

        const token = jwt.sign(payload,process.env.JWT_SECRET)

        res.cookie("token",token)

        res.status(201).json({
            success:true,
            message:"User Registered Successfully ✅",
            user,
            token,
        })

    }
    catch(error){
        return res.status(500).json({
            success:false,
            message:"Internal Server Error"
        })
    }
}

exports.login = async (req,res)=>{
    try{
        const {email,password} = req.body;      

        const user = await User.findOne({email})
        if(!user){
            return res.status(400).json({
                success:false,
                message:"User does not exist"
            })
        }

        const isMatch = await bcrypt.compare(password,user.password);
        if(!isMatch){
            return res.status(400).json({
                success:false,
                message:"Incorrect email or Password"
            })
        }           
        const payload = {
            id : user._id,
        }       
        const token = jwt.sign(payload,process.env.JWT_SECRET,{
            expiresIn:"1h",
        })
        res.cookie("token",token);


        res.status(200).json({
            success:true,
            message:"User Logged In Successfully ✅",       
            user,
            token,
        })       
    }catch(error){
        return res.status(500).json({
            success:false,
            message:"Internal Server Error"
        })
    }

}

exports.logout = async( req,res) => {
    try{
        res.clearCookie("token")

         res.status(200).json({
            success:true,
            message:"User logout Successfully"
        })

    }catch(error){
        return res.status(500).json({
            success:false,
            message:"Internal Server Error"
        })
    }
}

// for foodpartner

exports.registerfoodpartner = async(req,res)=> {
    try{
       const {username  , email , password ,contactNumber,address } = req.body;

       const existingPartner = await FoodPartner.findOne({email});

        if(existingPartner){
            return res.status(400).json({
                success:false,
                message:"Foodpartner already exists"
            })
        }

        const hashPassword = await bcrypt.hash(password,10);



        const foodpartner = await FoodPartner.create({
            username,
            email,
            password:hashPassword,
            contactNumber,
            address
        })

        const payload = {
            id : foodpartner._id,
        }

        const token = jwt.sign(payload,process.env.JWT_SECRET)

        res.cookie("token",token)

        res.status(201).json({
            success:true,
            message:"FoodPartner Registered Successfully ✅",
            foodpartner,
            token,
        })

    }
    catch(error){
        return res.status(500).json({
            success:false,
            message:"Internal Server Error "
        })
    }
}

exports.loginfoodpartner = async(req,res)=> {
    try{
        const {email,password} = req.body;      

        const foodpartner = await FoodPartner.findOne({email})
        if(!foodpartner){
            return res.status(400).json({
                success:false,
                message:"Foodpartner does not exist"
            })
        }

        const isMatch = await bcrypt.compare(password,foodpartner.password);
        if(!isMatch){
            return res.status(400).json({
                success:false,
                message:"Incorrect email or Password"
            })
        }           
        const payload = {
            id : foodpartner._id,
        }       
        const token = jwt.sign(payload,process.env.JWT_SECRET,{
            expiresIn:"1h",
        })
        res.cookie("token",token);


        res.status(200).json({
            success:true,
            message:"FoodPartner Logged In Successfully ✅",       
            foodpartner,
            token,
        })       
    }catch(error){
        return res.status(500).json({
            success:false,
            message:"Internal Server Error"
        })
    }
}

exports.logoutfoodpartner = async( req,res) => {
    try{
        res.clearCookie("token")

         res.status(200).json({
            success:true,
            message:"foodpartner logout Successfully"
        })

    }catch(error){
        return res.status(500).json({
            success:false,
            message:"Internal Server Error"
        })
    }
}
