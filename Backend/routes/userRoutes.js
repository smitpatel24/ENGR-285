const express = require("express");
const {
  getUsers,
  login,
  register,
  updateUserProfile,
  getOneUser,
} = require("../controllers/userController.js");
const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/getUsers", getUsers);
router.get("/getOneUser", getOneUser);
router.put("/updateUserProfile", updateUserProfile);
module.exports = router;
