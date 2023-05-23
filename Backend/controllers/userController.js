const User = require("../models/userModel.js");
const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const winston = require("winston");
const winstonmongodb = require("winston-mongodb");
const uri =
  "mongodb+srv://smitmongodb24:mongodb24@cluster-engr-285.a6ygl9n.mongodb.net/?retryWrites=true&w=majority";

const logger = winston.createLogger({
  level: "info",
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: "systemlog.log" }),
    new winstonmongodb.MongoDB({
      level: "info",
      db: uri,
      collection: "logs",
      options: { useUnifiedTopology: true },
      metaKey: "metadata", // Define the key to store metadata
    }),
  ],
});

const login = asyncHandler(async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    const JWT_SECRET = "THESECRETISINPLAINSIGHT";

    if (user && (await user.matchPassword(password))) {
      const token = jwt.sign(
        { userId: user._id, email: user.email },
        JWT_SECRET
      );

      logger.info("User login successful", {
        metadata: { userId: user._id, email: user.email }, // Add metadata object
      });

      return res.json({
        _id: user._id,
        email: user.email,
        token,
      });
    } else {
      logger.error("Invalid Email or Password", {
        metadata: { email }, // Add metadata object
      });

      res.status(401);
      throw new Error("Invalid Email or Password");
    }
  } catch (error) {
    logger.error("Error during login", {
      metadata: { error: error.message }, // Add metadata object
    });
    throw error;
  }
});

const jwtAuth = function (req, res, next) {
  if (req.user) {
    next();
  } else {
    logger.warn("Unauthorized user");
    return res.status(401).json({ message: "Unauthorized user!!" });
  }
};

const profile = function (req, res, next) {
  if (req.user) {
    res.send(req.user);
    next();
  } else {
    logger.warn("Invalid token");
    return res.status(401).json({ message: "Invalid token" });
  }
};

const register = asyncHandler(async (req, res) => {
  try {
    const { email, password, firstName, lastName } = req.body;
    const userExist = await User.findOne({ email });

    if (userExist) {
      logger.error("User already exists", {
        metadata: { email }, // Add metadata object
      });
      res.status(400);
      throw new Error("User already exists");
    }

    const user = await User.create({ email, password, firstName, lastName });

    if (user) {
      logger.info("User registered successfully", {
        metadata: { userId: user._id, email: user.email }, // Add metadata object
      });

      res.status(201).json({
        _id: user._id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
      });
    } else {
      logger.error("Invalid User Data");

      res.status(400);
      throw new Error("Invalid User Data");
    }
  } catch (error) {
    logger.error("Error during registration", {
      metadata: { error: error.message }, // Add metadata object
    });
    throw error;
  }
});

const getUsers = asyncHandler(async (req, res) => {
  try {
    if (req.user) {
      const users = await User.find({});
      res.json(users);
    } else {
      logger.warn("Unauthorized user");

      return res
        .status(401)
        .json({ message: "Unauthorized user!!", status: "error" });
    }
  } catch (error) {
    logger.error("Error while fetching users", {
      metadata: { error: error.message }, // Add metadata object
    });
    throw error;
  }
});

const getOneUser = asyncHandler(async (req, res) => {
  try {
    if (req.user) {
      const user = await User.findById(req.user.userId);
      if (user) {
        logger.info("User found", {
          metadata: { userId: user._id, email: user.email }, // Add metadata object
        });

        return res.json(user);
      } else {
        logger.error("User not found");

        res.status(404);
        throw new Error("User not found");
      }
    } else {
      logger.warn("Unauthorized user");

      return res
        .status(401)
        .json({ message: "Unauthorized user!!", status: "error" });
    }
  } catch (error) {
    logger.error("Error while fetching user", {
      metadata: { error: error.message }, // Add metadata object
    });
    throw error;
  }
});

const updateUserProfile = asyncHandler(async (req, res) => {
  try {
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
        logger.info("User profile updated", {
          metadata: { userId: updatedUser._id, email: updatedUser.email }, // Add metadata object
        });

        return res.json({
          _id: updatedUser._id,
          firstName: updatedUser.firstName,
          lastName: updatedUser.lastName,
          email: updatedUser.email,
          phoneNo: updatedUser.phoneNo,
        });
      } else {
        logger.error("User not found");

        res.status(404);
        throw new Error("User not found");
      }
    } else {
      logger.warn("Unauthorized user");

      return res
        .status(401)
        .json({ message: "Unauthorized user!!", status: "error" });
    }
  } catch (error) {
    logger.error("Error while updating user profile", {
      metadata: { error: error.message }, // Add metadata object
    });
    throw error;
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
