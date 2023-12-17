const Comment = require("../models/Comment")
const Post = require("../models/Post")

exports.createComment = async (req, res) => {
    try {
        const { postId, start, description } = req.body;

        // Vérifier si le post existe
        const post = await Post.findById(postId);
        if (!post) {
            return res.status(404).json({ message: "Post not found" });
        }

        // Créer un nouveau commentaire
        const newComment = new Comment({
            start,
            description,
            user: req.user.id, // ID de l'utilisateur connecté (assurez-vous que req.user est défini)
            post: postId
        });

        await newComment.save();

        // Ajouter le commentaire à la liste des commentaires du post
        post.comments.push(newComment._id);
        await post.save();

        res.status(201).json({ message: "Comment created successfully", comment: newComment });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

exports.getAllComments = async (req, res) => {
    try{
        const comments = await Comment.find().populate("user").populate("post")
        res.json(comments);

    }catch(err){
        res.status(500).json({ message: err.message});
    }
}

exports.getCommentById = async (req, res) => {
    try {
        // Utilisez findById au lieu de find
        const comment = await Comment.findById(req.params.id).populate("user").populate("post");
        if (!comment) {
            return res.status(404).send({message: "Comment not found"});
        }
        res.json(comment);
    } catch (err) {
        res.status(500).send({message: err.message});
    }
};


exports.updateComment = async (req, res) => {
    try {
        const commentId = req.params.id;
        const { start, description } = req.body;

        // Trouver le commentaire par ID et le mettre à jour
        const updatedComment = await Comment.findByIdAndUpdate(
            commentId, 
            { start, description },
            { new: true } // Cette option renvoie le document mis à jour
        );

        if (!updatedComment) {
            return res.status(404).json({ message: "Comment not found" });
        }

        res.status(200).json({ message: "Comment updated successfully", comment: updatedComment });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.deleteComment = async (req, res) => {
    try{
       const comment = await Comment.findByIdAndDelete(req.params.id);
         if(!comment){
            return res.status(404).json({ message: "Comment not found"})
         }

         res.status(200).json({ message: "Comment deleted successfully" });
    }catch(err) {
        res.status(500).json({ message: err.message})
    }
}