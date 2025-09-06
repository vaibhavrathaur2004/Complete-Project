const FoodPartner = require('../models/Foodpartner')
const Food = require("../models/Food")

exports.getFoodPertnerBtId = async(req,res) => {
    try{
        const FoodpartnerId = req.params.id

        const foodpartnerdata = await FoodPartner.findById(FoodpartnerId);

        const foodvideos = await Food.find({ foodPartner : FoodpartnerId})

        if(!foodpartnerdata){
            return res.status(404).json({
                success:false,
                message:"This Food Partner is not registerd"
            })
        }

       const mergedata = {
         ...foodpartnerdata.toObject(),
         fooditems:foodvideos,
       }

        return res.status(200).json({
            success:true,
            message:"Food Partner data Reiceved Successfully",
            foodpartner : mergedata,
            
        })

    }catch(error){
        return res.status(500).json({
        success: false,
        message: "Something went wrong while creating food.",
        error: error.message,
        });
    }
}