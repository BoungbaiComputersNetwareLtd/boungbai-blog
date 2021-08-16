const mongoose = require('mongoose');

const CommentSchema = new mongoose.Schema({
    text: {
        type: String,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    post: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post"
    }
});

const Comment = mongoose.model("Comment", CommentSchema);

exports.Comment = Comment;
exports.CommentSchema = CommentSchema;