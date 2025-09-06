const mongoose = require('mongoose');

const foodSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true, // ❌ Was "require", should be "required"
    },
    video: {
        type: String,
        required: true, // ❌ Same typo here
        unique: true,
    },
    description: {
        type: String,
    },
    foodPartner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "FoodPartner"
    },
    likeCount:{
        type:Number,
        default:0
    },
    saveCount:{
        type:Number,
        default:0
    }
}, {
    timestamps: true // ✅ Optional but recommended: adds createdAt and updatedAt
});

module.exports = mongoose.model("Food", foodSchema);
