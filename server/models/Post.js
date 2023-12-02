const mongoose = require("mongoose")

const postSchema = new mongoose.Schema({
 auteur: {
    type: mongoose.Schema.Types.ObjectId,
    ref:"User", 
    required: true
 }, 
 likes: [{ 
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", 
}], 
 image: {
    type: String
 }, 
 description: {
    type: String
 },
 title: {
   type: String, 
   required: true,
 },
 countlike:{
    type: Number,
    default: 0, 
 },
 comments: [{
   type: mongoose.Schema.Types.ObjectId, 
   ref: 'Comment' 
 }]

},{
    timestamps: true
})

const Post = mongoose.model("Post", postSchema)

module.exports = Post