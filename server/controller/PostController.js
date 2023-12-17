const Post = require("../models/Post");
const User = require("../models/Users")
const uploadImageToFirebase = require("../utils/imageFile");

exports.createPost = async (req, res) => {
    try {
        const { title, description } = req.body;
        let imageUrl = null;

        const post = new Post({ 
            title, 
            description, 
            image: imageUrl, 
            auteur: req.user.id, 
        });

        if (req.file) {
            imageUrl = await uploadImageToFirebase(req.file, req.user.id, "post", post._id);
            post.image = imageUrl;
        }

        await post.save();
        await User.findByIdAndUpdate(req.user.id, { $push: { posts: post._id } });
        res.status(200).json({ message: "Success", post });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};


exports.getAllPost = async (req, res) => {
    try {
        const posts = await Post.find({}).populate('auteur').populate('comments');
        res.json(posts);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
}

exports.getPostById = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id).populate('auteur').populate('comments');
        if (!post) {
            return res.status(404).json({ message: "Post introuvable" });
        }
        res.json(post);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
}

exports.updatePost = async (req, res) => {
try{
    const{title, description} = req.body
    const post = await Post.findById(req.params.id)

    if(!post){
        return res.status(404).json({ message: 'post introuvable'})
    }

    if(req.file){
        post.image = await uploadImageToFirebase(req.file, req.user.id, "post", post._id)
    }

    post.title = title || post.title;
    post.description = description || post.description

    await post.save()

    res.json(post)
}catch(err){
    res.status(500).json({ message: err.message })
}
}

exports.deletePost = async (req, res) => {
   try{
      const post = await Post.findByIdAndDelete(req.params.id);

      if(!post){
        return res.status(404).json({ message:"No post found"});
      }

      res.status(200).json({ message: "post deleted successfully"});
   } catch(err){ 
    res.status(500).json({ message: err.message});
   }
}

exports.toggleLike = async (req, res) => {
    try{
        const post = await Post.findById(req.params.id);

        if(!post){
          return res.status(404).json({ message:"No post found"});
        }

        const likeIndex = post.likes.indexOf(req.user.id);
        if(likeIndex > -1){
            post.likes.splice(likeIndex, 1);
        }else{
            post.likes.push(req.user.id)
        }

        await post.save();

        res.json(post);

    }catch(err){
        res.status(500).json({ message: err.message});
    }
}