const asyncHandler = require("express-async-handler");
const Post = require("../models/postModel.js");
const winston = require("winston");
const winstonmongodb = require("winston-mongodb");
const uri =
  "mongodb+srv://smitmongodb24:mongodb24@cluster-engr-285.a6ygl9n.mongodb.net/?retryWrites=true&w=majority";

// smitmongodb24;
// mongodb24;

const logger = winston.createLogger({
  level: "info",
  format: winston.format.combine(
    winston.format.timestamp(), // Add timestamp to each log entry
    winston.format.json()
  ),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: "systemlog.log" }),
    new winston.transports.MongoDB({
      level: "info", // Log level for the transport
      db: uri, // MongoDB connection URI
      collection: "logs", // Collection name to store logs
      options: { useUnifiedTopology: true }, // MongoDB connection options
      format: winston.format.combine(
        winston.format.timestamp(), // Add timestamp to each log entry
        winston.format.json()
      ),
    }),
  ],
});

const getAllPosts = asyncHandler(async (req, res) => {
  try {
    if (req.user) {
      const user = req.user;
      const list = await Post.find({}).sort({ updatedAt: -1 });
      res.json(list);
      logger.info("Posts fetched correctly for user", { metadata: { user } });
    } else {
      logger.warn("Unauthorized user", { metadata: req.body });

      return res
        .status(401)
        .json({ message: "Unauthorized user!!", status: "error" });
    }
  } catch (error) {
    logger.error("Error while fetching all posts", { metadata: { error } });
    throw error;
  }
});

const getPostByUserId = asyncHandler(async (req, res) => {
  try {
    if (req.user) {
      const userId = req.user.userId;
      const list = await Post.find({
        userId: req.user.userId,
      });
      res.json(list);
      logger.info("Post fetched by userId", { metadata: { userId } });
    } else {
      logger.warn("Unauthorized user", { metadata: req.body });

      return res
        .status(401)
        .json({ message: "Unauthorized user!!", status: "error" });
    }
  } catch (error) {
    logger.error("Error while fetching posts by user ID", {
      metadata: { error },
    });
    throw error;
  }
});

const createPost = asyncHandler(async (req, res) => {
  try {
    if (req.user) {
      const {
        address,
        moveIn,
        moveOut,
        userId,
        userPhone,
        userEmail,
        rent,
        comments,
      } = req.body;

      const post = await Post.create({
        address,
        moveIn,
        moveOut,
        userId,
        userPhone,
        userEmail,
        rent,
        comments,
      });

      if (post) {
        logger.info("Post created successfully", {
          metadata: { postId: post._id },
        });
        res.status(201).json(post);
      } else {
        logger.error("Invalid Post Data", { metadata: req.body });
        res.status(400);
        throw new Error("Invalid Post Data");
      }
    } else {
      logger.warn("Unauthorized user", { metadata: req.body });

      return res
        .status(401)
        .json({ message: "Unauthorized user!!", status: "error" });
    }
  } catch (error) {
    logger.error("Error while creating post", { metadata: { error } });
    throw error;
  }
});

const updatePost = asyncHandler(async (req, res) => {
  try {
    if (req.user) {
      const post = await Post.findById(req.body._id);

      if (post) {
        post.address = req.body.address || post.address;
        post.moveIn = req.body.moveIn || post.moveIn;
        post.moveOut = req.body.moveOut || post.moveOut;
        post.userPhone = req.body.userPhone || post.userPhone;
        post.userEmail = req.body.userEmail || post.userEmail;
        post.rent = req.body.rent || post.rent;
        post.comments = req.body.comments || post.comments;

        const updatedPost = await post.save();
        logger.info("Post updated successfully", {
          metadata: { postId: updatedPost._id },
        });
        return res.json(updatedPost);
      } else {
        logger.error("Post not found", { metadata: req.body });
        res.status(404);
        throw new Error("Post not found");
      }
    } else {
      logger.warn("Unauthorized user", { metadata: req.body });

      return res
        .status(401)
        .json({ message: "Unauthorized user!!", status: "error" });
    }
  } catch (error) {
    logger.error("Error while updating post", { metadata: { error } });
    throw error;
  }
});

const deletePost = asyncHandler(async (req, res) => {
  try {
    if (req.user) {
      const post = await Post.findByIdAndDelete(req.body._id);

      if (!post) {
        logger.error("Post not found", { metadata: req.body });
        res.status(404);
        throw new Error("Post not found");
      }

      logger.info("Post deleted successfully", {
        metadata: { postId: req.body._id },
      });

      res.status(200).json({
        message: "Post deleted successfully",
      });
    } else {
      logger.warn("Unauthorized user", { metadata: req.body });

      return res
        .status(401)
        .json({ message: "Unauthorized user!!", status: "error" });
    }
  } catch (error) {
    logger.error("Error while deleting post", { metadata: { error } });
    throw error;
  }
});

module.exports = {
  getAllPosts,
  createPost,
  getPostByUserId,
  updatePost,
  deletePost,
};
