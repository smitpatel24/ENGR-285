const User = require("../models/userModel.js");
const asyncHandler = require("express-async-handler");

const login = asyncHandler(async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });

  if (user && (await user.matchPassword(password))) {
    return res.json({
      _id: user._id,
      username: user.username,
    });
  } else {
    res.status(401);
    throw new Error("Invalid Username or Password");
  }
});

const register = asyncHandler(async (req, res) => {
  const { username, password, name } = req.body;
  const userExist = await User.findOne({ username });

  if (userExist) {
    res.status(400);
    throw new Error("User already Exist");
  }

  const user = await User.create({ username, password, name });

  if (user) {
    res.status(201).json({
      _id: user._id,
      username: user.username,
      name: user.name,
    });
  } else {
    res.status(400);
    throw new Error("Invalid User Data");
  }
});

const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find({});
  res.json(users);
});

const getOneUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.body._id);

  if (user) {
    return res.json(user);
  } else {
    res.status(404);
    throw new Error("User not Found");
  }
});

const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.body._id);

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.phoneNo = req.body.phoneNo || user.phoneNo;
    if (req.body.password) {
      user.password = req.body.password;
    }

    const updatedUser = await user.save();
    return res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      phoneNo: updatedUser.phoneNo,
    });
  } else {
    res.status(404);
    throw new Error("User not Found");
  }
});

module.exports = { login, register, getUsers, getOneUser, updateUserProfile };
