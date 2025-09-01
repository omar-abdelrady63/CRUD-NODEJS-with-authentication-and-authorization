const express = require("express");
const router = express.Router();
const postsController = require("../controllers/posts.controller");
const {createPostSchema , updatePostSchema} = require("../utilities/validation/postValidator");
const multer = require("multer");
const validate = require("../middlewares/validatorMiddleware");
const uploadImageKit = require("../middlewares/imagekits");
const { uploadCDN } = require("../middlewares/multer");
const auth = require("../middlewares/auth");
const restrictTo = require("../middlewares/restrictTo");



router.post(
  "/",
  uploadCDN.single("images"),
  uploadImageKit(false),
  validate(createPostSchema),
  auth,
  postsController.createPost
);

router.get("/",auth , restrictTo("admin"), postsController.getPosts);

router.get("/:id", postsController.getPostById);

router.patch(
  "/:id",
  auth,
  restrictTo("admin"),
  validate(updatePostSchema),
  postsController.updatePost
);

router.delete(
  "/:id",
  auth,
  restrictTo("admin"),
  postsController.deletePost
);

module.exports = router;
