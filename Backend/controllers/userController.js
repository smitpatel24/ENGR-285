const User = require("../models/userModel.js");
const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");

const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  const JWT_SECRET = "THESECRETISINPLAINSIGHT";

  if (user && (await user.matchPassword(password))) {
    const token = jwt.sign({ userId: user._id, email: user.email }, JWT_SECRET);

    return res.json({
      _id: user._id,
      email: user.email,
      token, // Add the token to the response
    });
  } else {
    res.status(401);
    throw new Error("Invalid Email or Password");
  }
});

const jwtAuth = function (req, res, next) {
  if (req.user) {
    next();
  } else {
    return res.status(401).json({ message: "Unauthorized user!!" });
  }
};

const profile = function (req, res, next) {
  if (req.user) {
    res.send(req.user);
    next();
  } else {
    return res.status(401).json({ message: "Invalid token" });
  }
};

const register = asyncHandler(async (req, res) => {
  const { email, password, firstName, lastName } = req.body;
  const userExist = await User.findOne({ email });

  if (userExist) {
    res.status(400);
    throw new Error("User already Exist");
  }

  const user = await User.create({ email, password, firstName, lastName });

  if (user) {
    res.status(201).json({
      _id: user._id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
    });
  } else {
    res.status(400);
    throw new Error("Invalid User Data");
  }
});

const getUsers = asyncHandler(async (req, res) => {
  if (req.user) {
    const users = await User.find({});
    res.json(users);
  } else {
    return res
      .status(401)
      .json({ message: "Unauthorized user!!", status: "error" });
  }
});

const getOneUser = asyncHandler(async (req, res) => {
  if (req.user) {
    const user = await User.findById(req.user.userId);
    if (user) {
      return res.json(user);
    } else {
      res.status(404);
      throw new Error("User not Found");
    }
  } else {
    return res
      .status(401)
      .json({ message: "Unauthorized user!!", status: "error" });
  }
});

const updateUserProfile = asyncHandler(async (req, res) => {
  if (req.user) {
    const user = await User.findById(req.body._id);
    if (user) {
      user.firstName = req.body.firstName || user.firstName;
      user.lastName = req.body.lastName || user.lastName;
      user.phoneNo = req.body.phoneNo || user.phoneNo;
      if (req.body.password) {
        user.password = req.body.password;
      }

      const updatedUser = await user.save();
      return res.json({
        _id: updatedUser._id,
        firstName: updatedUser.firstName,
        lastName: updatedUser.lastName,
        email: updatedUser.email,
        phoneNo: updatedUser.phoneNo,
      });
    } else {
      res.status(404);
      throw new Error("User not Found");
    }
  } else {
    return res
      .status(401)
      .json({ message: "Unauthorized user!!", status: "error" });
  }
});

module.exports = {
  login,
  register,
  getUsers,
  getOneUser,
  updateUserProfile,
  jwtAuth,
  profile,
};
