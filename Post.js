const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      min: 5,
      max: 20,
      unique: true,
    },
    description: {
      type: String,
      required: true,
      min: 5,
      max: 255,
    },
    image: { 
      type: String
    },
    postedBy: {
      type: String,
      default: "Admin",
    },
    comments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment",
      },
    ],
  },
  { timestamps: true }
);

const Post = mongoose.model("Post", PostSchema);

exports.Post = Post;
exports.PostSchema = PostSchema;
