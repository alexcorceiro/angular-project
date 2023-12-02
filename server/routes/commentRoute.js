const express = require("express")
const { createComment, getCommentById, updateComment, deleteComment, getAllComments } = require("../controller/CommentController")
const { authenticate } = require("../middleware/auth")
const router = express.Router()


router.post('/', authenticate,  createComment)
router.get("/", getAllComments)
router.get("/:id", getCommentById)
router.put('/:id', authenticate,  updateComment)
router.delete("/:id", authenticate,  deleteComment)




module.exports = router