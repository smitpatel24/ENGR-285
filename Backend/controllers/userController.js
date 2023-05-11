const User = require("../models/userModel.js");
const asyncHandler = require("express-async-handler");

//@desc     Auth User & Get Token
//@route    POST api/users/login
//@access   Public
const login = asyncHandler(async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });

  if (user && (await user.matchPassword(password))) {
    return res.json({
      _id: user._id,
      username: user.username,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(401);
    throw new Error("Invalid Username or Password");
  }
});

//@desc     REGISTER User & Get Token
//@route    POST api/users/register
//@access   Public
const register = asyncHandler(async (req, res) => {
  const { username, password } = req.body;
  const userExist = await User.findOne({ username });

  if (userExist) {
    res.status(400);
    throw new Error("User already Exist");
  }

  const user = await User.create({ username, password });

  if (user) {
    res.status(201).json({
      _id: user._id,
      username: user.username,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(400);
    throw new Error("Invalid User Data");
  }
});

//@desc     Get all Users
//@route    GET api/users
//@access   Private/Admin
const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find({});
  res.json(users);
});

//@desc     Update User Profile
//@route    PUT api/users/profile/:id
//@access   Private
// const updateUserProfile = asyncHandler(async (req, res) => {
//   const user = await User.findById(req.user._id);

//   if (user) {
//     user.name = req.body.name || user.name;
//     user.email = req.body.email || user.email;
//     if (req.body.password) {
//       user.password = req.body.password;
//     }

//     const updatedUser = await user.save();
//     return res.json({
//       _id: updatedUser._id,
//       name: updatedUser.name,
//       email: updatedUser.email,
//       isAdmin: updatedUser.isAdmin,
//     });
//   } else {
//     res.status(404);
//     throw new Error("User not Found");
//   }
// });

module.exports = { login, register, getUsers };
