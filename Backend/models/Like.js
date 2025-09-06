const mongoose= require('mongoose')

const likeSchema = new mongoose.Schema({
    user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // ✅ Should match your User model name
    required: true
  },
  food: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Food', // ✅ Correct: a string, name of the Food model
    required: true
  }
},{timestamps:true})

module.exports =mongoose.model("Like",likeSchema)