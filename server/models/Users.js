const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    prenom: {
        type: String, 
        required: true 
    }, 
    nom: {
        type: String, 
        required: true
    }, 
    email: {
        type: String, 
        unique: true, 
        required: true
    }, 
    password: {
        type: String, 
        required: true
    },
    dateNaissance: {
        type: String, 
        required: true
    },
    image: {
        type: String
    },
    posts: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post"
    }]
}, {
    timestamps: true
}); 

const User = mongoose.model("User", UserSchema);

module.exports = User;
