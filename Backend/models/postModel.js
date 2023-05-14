const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema(
  {
    address: {
      type: String,
      required: true,
    },
    moveIn: {
      type: String,
      required: true,
    },
    moveOut: {
      type: String,
      required: true,
    },
    userId: {
      type: String,
      required: true,
    },
    userPhone: {
      type: String,
      required: true,
    },
    userEmail: {
      type: String,
      required: true,
    },
    rent: {
      type: String,
      required: true,
    },
    comments: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);
const Post = mongoose.model("Post", PostSchema);
module.exports = Post;
