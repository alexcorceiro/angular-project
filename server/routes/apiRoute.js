const express = require("express")
const router = express.Router()


const userRouter = require("./UserRoute")
const postRouter = require("./PostRoute")
const  commentRouter = require("./commentRoute")

router.use("/users", userRouter)
router.use("/post", postRouter)
router.use("/comment", commentRouter)


module.exports = router