const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Post title is required"],
    minlength: 3,
  },
  content: {
    type: String,
    required: [true, "Post content is required"],
  },
  photo: {
    type: String,
    
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", 
    required: true,
  },
});

module.exports = mongoose.model("Post", postSchema);
