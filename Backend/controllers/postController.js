const asyncHandler = require("express-async-handler");
const Post = require("../models/postModel.js");

const getAllPosts = asyncHandler(async (req, res) => {
  if (req.user) {
    const list = await Post.find({});
    res.json(list);
  } else {
    return res
      .status(401)
      .json({ message: "Unauthorized user!!", status: "error" });
  }
});

const getPostByUserId = asyncHandler(async (req, res) => {
  if (req.user) {
    const list = await Post.find({
      userId: req.body.userId,
    });
    res.json(list);
  } else {
    return res
      .status(401)
      .json({ message: "Unauthorized user!!", status: "error" });
  }
});

const createPost = asyncHandler(async (req, res) => {
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
      res.status(201).json(post);
    } else {
      res.status(400);
      throw new Error("Invalid Post Data");
    }
  } else {
    return res
      .status(401)
      .json({ message: "Unauthorized user!!", status: "error" });
  }
});

const updatePost = asyncHandler(async (req, res) => {
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

      const updatedUser = await post.save();
      return res.json(updatedUser);
    } else {
      res.status(404);
      throw new Error("Post not Found");
    }
  } else {
    return res
      .status(401)
      .json({ message: "Unauthorized user!!", status: "error" });
  }
});

const deletePost = asyncHandler(async (req, res) => {
  if (req.user) {
    const post = await Post.findByIdAndDelete(req.body._id);

    if (!post) {
      res.status(404);
      throw new Error("Post not found");
    }

    res.status(200).json({
      message: "Post deleted successfully",
    });
  } else {
    return res
      .status(401)
      .json({ message: "Unauthorized user!!", status: "error" });
  }
});

module.exports = {
  getAllPosts,
  createPost,
  getPostByUserId,
  updatePost,
  deletePost,
};
