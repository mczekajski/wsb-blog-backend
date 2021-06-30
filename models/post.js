const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  postTitle: {
    type: String,
    required: true,
  },
  postBody: {
    type: String,
    required: true,
  },
  postDate: {
    type: String,
    required: true,
  },
  lastEditDate: {
    type: String,
    required: true,
  },
});

const Post = mongoose.model('Post', postSchema);
module.exports = Post;