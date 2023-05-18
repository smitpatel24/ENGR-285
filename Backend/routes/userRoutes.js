const express = require("express");
const {
  getUsers,
  login,
  register,
  updateUserProfile,
  getOneUser,
  jwtAuth,
  profile,
} = require("../controllers/userController.js");
const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/jwtAuth", jwtAuth, profile);
router.get("/getUsers", getUsers);
router.get("/getOneUser", getOneUser);
router.put("/updateUserProfile", updateUserProfile);
module.exports = router;
