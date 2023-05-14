const express = require("express");
const {
  getAllPosts,
  createPost,
  getPostByUserId,
  updatePost,
  deletePost,
} = require("../controllers/postController");
const router = express.Router();

router.post("/createPost", createPost);
router.get("/getAllPosts", getAllPosts);
router.get("/getPostByUserId", getPostByUserId);
router.put("/updatePost", updatePost);
router.delete("/deletePost", deletePost);
module.exports = router;
