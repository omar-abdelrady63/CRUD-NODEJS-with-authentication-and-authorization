const User = require("../models/User");
const Post = require("../models/Post");
const AppError = require("../utilities/AppError");
const bcrypt = require("bcrypt");

const createUser = async (req, res, next) => {
  try {
    const { name, age, email, bio, password, role } = req.body;

    let hashedPassword = password;
    if (password) {
      const saltRounds = 10;
      hashedPassword = await bcrypt.hash(password, saltRounds);
    }

    let photoUrl = null;
    if (req.images && req.images[0]) {
      photoUrl = req.images[0];
    } else if (req.file) {
      photoUrl = `/uploads/${req.file.filename}`;
    }

    const user = await User.create({
      name,
      age,
      email,
      bio,
      password: hashedPassword,
      role: role || "user",
      photo: photoUrl,
    });

    res.status(201).json({ message: "User created", user });
  } catch (err) {
    next(err);
  }
};

const getAllUsers = async (req, res) => {
  const { limit, page, name } = req.query;
  let query = {};
  if (name) {
    query.name = name;
  }
  const skip = (page - 1) * limit;
  const users = await User.find(query).limit(limit).skip(skip);
  const total = await User.countDocuments(query);
  const pag = {
    total,
    page,
    pages: Math.ceil(total / limit),
  };
  res.status(200).json({ users, pag });
};

const getUserById = async (req, res, next) => {
  try {
    const id = req.params.id;
    const user = await User.findById(id);

    if (!user) {
      throw new AppError("User not found", 404);
    }

    res.status(200).json(user);
  } catch (err) {
    next(err);
  }
};

const updateUserPutMethod = async (req, res, next) => {
  try {
    const id = req.params.id;
    const { name, email, age, bio, password, role } = req.body;

    let hashedPassword = password;
    if (password) {
      const saltRounds = 10;
      hashedPassword = await bcrypt.hash(password, saltRounds);
    }

    const updatedUser = await User.findByIdAndUpdate(
      id,
      {
        name,
        email,
        age,
        bio,
        password: hashedPassword,
        role,
        photo: req.images ? req.images[0] : undefined,
      },
      { new: true, runValidators: true }
    );

    if (!updatedUser) {
      throw new AppError("User not found", 404);
    }

    res.status(200).json({ message: "User updated", user: updatedUser });
  } catch (err) {
    next(err);
  }
};

const updateUserPatchMethod = async (req, res, next) => {
  try {
    const id = req.params.id;

    const updateData = { ...req.body };

    if (updateData.password) {
      const saltRounds = 10;
      updateData.password = await bcrypt.hash(updateData.password, saltRounds);
    }

    const updatedUser = await User.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });

    if (!updatedUser) {
      throw new AppError("User not found", 404);
    }

    res.status(200).json({ message: "User updated", user: updatedUser });
  } catch (err) {
    next(err);
  }
};

const deleteUser = async (req, res, next) => {
  try {
    const id = req.params.id;
    const deletedUser = await User.findByIdAndDelete(id);

    if (!deletedUser) {
      throw new AppError("User not found", 404);
    }
    await Post.deleteMany({ userId: id });

    res.status(200).json({ message: "User deleted" });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  createUser,
  getAllUsers,
  getUserById,
  updateUserPutMethod,
  updateUserPatchMethod,
  deleteUser,
};
