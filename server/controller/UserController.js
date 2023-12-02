const User = require("../models/Users")
const bcrypt = require("bcrypt")
const {generateToken} = require("../middleware/auth")
const uploadImageToFirebase = require("../utils/imageFile")

exports.register = async (req, res) => {
    try {
        const { prenom, nom, email, password, confirmPassword, dateNaissance } = req.body;

      
        if (password !== confirmPassword) {
            return res.status(400).json({ message: "Les mots de passe ne correspondent pas." });
        }

     
        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ message: "Un utilisateur avec cet email existe déjà." });
        }

     
        const hashedPassword = await bcrypt.hash(password, 10);

        const user = new User({
            prenom,
            nom,
            email,
            password: hashedPassword,
            dateNaissance
        });

        await user.save();

        const token = generateToken(user.id)


        return res
        .status(200)
        .cookie("token", token, {
          httpOnly: true,
          sameSite: "strict",
        })
        .json({ message: "utilisateur cree avec success", user});
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.login = async (req,res) => {
    try{
        const{email, password} = req.body

        const user = await User.findOne({ email: email});

        if(!user){
            return res.status(400).json({message: "utilisateur introuvable"})
        }

        const isMatch = await bcrypt.compare(password, user.password)

        if(!isMatch){
            return res.status(400).json({ message: "mot de passe incorrect"})
        }

        const token = generateToken(user.id)

        return res
          .status(200)
          .cookie("token", token, {
            httpOnly: true,
            sameSite: "strict",
          })
          .json(user);
    }catch(err){
        res.status(400).json({message: err.message})
    }
}

exports.getProfile = async (req, res) => {
    try{
        const user = await User.findById(req.user.id).populate('posts');
        res.json(user)
    }catch(err){
        res.status(500).json({message: err.message})
    }
}

exports.updateUser = async (req, res) => {
    try {
        const { prenom, nom, email } = req.body;
        let user = await User.findById(req.user.id);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

     
        user.prenom = prenom || user.prenom;
        user.nom = nom || user.nom;
        user.email = email || user.email;

        
        if (req.file) {
            const imageUrl = await uploadImageToFirebase(req.file, req.user.id,'profile');
            user.image = imageUrl; 
        }

        await user.save();
        res.json(user);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.deleteUser = async (req, res) => {
    try{
        const usreId = req.user.id;

        await User.findByIdAndDelete(usreId);

        res.status(200).json({ message: "user deleted successfully"});
    }catch(err){
        res.status(400).json({ message: err.message})
    }
}