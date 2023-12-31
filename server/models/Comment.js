const mongoose = require("mongoose")

const CommentSchema = new mongoose.Schema({
 start: {
    type: String
 }, 
 description: {
    type: String, 
    required: true
 },
 user: {
    type: mongoose.Schema.Types.ObjectId, 
    ref: "User"
 }, 
 post: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Post"
 }
},{
    timestamps: true
});

const Comment = mongoose.model("Comment", CommentSchema);

module.exports = Comment