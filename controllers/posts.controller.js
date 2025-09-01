const Post = require("../models/Post"); 
const AppError = require("../utilities/AppError");

const createPost = async (req, res, next) => {
  try {
    const { title, content, userId } = req.body;

    const post = await Post.create({
      title,
      content,
      userId,
      photo: req.images ? req.images[0] : null,
    });

    res.status(201).json({ message: "Created!", post });
  } catch (err) {
    next(err);
  }
};

const getPosts = async (req, res, next) => {
  try {
    const posts = await Post.find().populate("userId", "name email");
    res.status(200).json({ posts });
  } catch (err) {
    next(err);
  }
};


const getPostById = async (req, res, next) => {
  try {
    const id = req.params.id;
    const post = await Post.findById(id).populate("userId", "name email");

    if (!post) {
      throw new AppError("Post not found", 404);
    }

    res.status(200).json(post);
  } catch (err) {
    next(err);
  }
};

const updatePost = async (req, res, next) => {
  try {
    const id = req.params.id;

    const updateData = {
      ...(req.body.title && { title: req.body.title }),
      ...(req.body.content && { content: req.body.content }),
      ...(req.body.userId && { userId: req.body.userId }),
      ...(req.images && { photo: req.images[0] }),
    };

    const updatedPost = await Post.findByIdAndUpdate(id, updateData, {
      new: true, 
      runValidators: true, 
    });

    if (!updatedPost) {
      throw new AppError("Post not found", 404);
    }

    res.status(200).json({
      message: "Post updated",
      post: updatedPost,
    });
  } catch (err) {
    next(err);
  }
};

const deletePost = async (req, res, next) => {
  try {
    const id = req.params.id;
    const deletedPost = await Post.findByIdAndDelete(id);

    if (!deletedPost) {
      throw new AppError("Post not found", 404);
    }

    res.status(200).json({ message: "Post deleted" });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  createPost,
  getPosts,
  getPostById,
  updatePost,
  deletePost,
};
