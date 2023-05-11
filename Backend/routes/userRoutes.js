const express = require("express");
const {
  getUsers,
  login,
  register,
  // updateUserProfile,
} = require("../controllers/userController.js");
const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/", getUsers);
// router.put('/',updateUserProfile);
module.exports = router;
