const express = require("express");
const { authenticate } = require("../middleware/auth");
const { createPost, getAllPost, getPostById, updatePost, deletePost, toggleLike } = require("../controller/PostController");
const upload = require("../middleware/image");
const router = express.Router(); 


router.post("/", authenticate, upload.single('image'), createPost)
router.post("/:id/likes", authenticate, toggleLike)
router.get("/", getAllPost)
router.get("/:id",  getPostById)
router.put("/:id", authenticate, upload.single('image'),  updatePost)
router.delete("/:id", authenticate, deletePost)


module.exports = router