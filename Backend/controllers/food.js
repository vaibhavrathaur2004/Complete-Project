const Food = require('../models/Food');
const Like = require('../models/Like');
const SaveModel = require('../models/Save');
const { fileUpload } = require('../sevices/storage')
const {v4:uuid} = require('uuid')

exports.createFood =async (req,res)=> {

    try{

        const {name , description} = req.body;

        const fileUploadresult = await fileUpload(req.file.buffer,uuid())

        const fooditem = await Food.create({
            name,
            video:fileUploadresult.url,
            description,
            foodPartner:req.foodPartner._id
        })
        
        console.log(fileUploadresult);

        return res.status(201).json({
            success:true,
            message:"Food item created",
            FoodItems:fooditem,
        })      

         

    }
    catch(error){
    console.error("Error creating food:", error);
    return res.status(500).json({
        success: false,
        message: "Something went wrong while creating food.",
        error: error.message,
    });
}

}


exports.getAllfood = async(req,res) =>{

    const food = await Food.find({})

    return res.status(200).json({
        success:true,
        message:"All Food items ✅",
        foods :food,
    })
}


exports.likeFood = async(req,res)=> {
    try{
        const { foodId } = req.body;
        const user = req.user;

        const isAlreadyLiked = await Like.findOne({
            user: user._id,
            food: foodId
        })

        if (isAlreadyLiked) {
            await Like.deleteOne({
                user: user._id,
                food: foodId
            })

            await Food.findByIdAndUpdate(foodId, {
                $inc: { likeCount: -1 }
            })

            return res.status(200).json({
            message: "Food unliked successfully"
            })
        }

        const like = await Like.create({
            user: user._id,
            food: foodId
        })

        await Food.findByIdAndUpdate(foodId, {
            $inc: { likeCount: 1 }
        })

        res.status(201).json({
            message: "Food liked successfully",
            like
        })
    }

    catch(error){
        console.log(error.message);
        
    }
}

exports.saveFood= async(req, res) =>{

    const { foodId } = req.body;
    const user = req.user;

    const isAlreadySaved = await SaveModel.findOne({
        user: user._id,
        food: foodId
    })

    if (isAlreadySaved) {
        await SaveModel.deleteOne({
            user: user._id,
            food: foodId
        })

        await Food.findByIdAndUpdate(foodId, {
            $inc: { saveCount: -1 }
        })

        return res.status(200).json({
            message: "Food unsaved successfully"
        })
    }

    const save = await SaveModel.create({
        user: user._id,
        food: foodId
    })

    await Food.findByIdAndUpdate(foodId, {
        $inc: { saveCount: 1 }
    })

    res.status(201).json({
        message: "Food saved successfully",
        save
    })

}


exports.getSaveFood = async(req, res)=> {

    const user = req.user;

    const savedFoods = await SaveModel.find({ user: user._id }).populate('food');

    if (!savedFoods || savedFoods.length === 0) {
        return res.status(404).json({ message: "No saved foods found" });
    }

    res.status(200).json({
        message: "Saved foods retrieved successfully",
        savedFoods
    });

}