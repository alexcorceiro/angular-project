const express = require("express")
const { login, register, getProfile, updateUser, deleteUser } = require("../controller/UserController")
const { authenticate } = require("../middleware/auth")
const upload = require("../middleware/image")
const router = express.Router()


router.post("/", login)
router.post("/register", register)
router.get("/profile", authenticate, getProfile)
router.put("/updateprofile", authenticate, upload.single('image'),  updateUser)
router.delete("/deleteProfile", authenticate,  deleteUser)



module.exports = router