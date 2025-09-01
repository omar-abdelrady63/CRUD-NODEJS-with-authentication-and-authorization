const express = require("express");
const router = express.Router();

const {
  createUser,
  getAllUsers,
  getUserById,
  updateUserPutMethod,
  updateUserPatchMethod,
  deleteUser,
} = require("../controllers/users.controller");

const {
  createUserSchema,
  updateUserPutSchema,
  updateUserSchema,
} = require("../utilities/validation/user.validation");

const validate = require("../middlewares/validate");
const { uploadLocal, uploadCDN } = require("../middlewares/multer");
const uploadImageKit = require("../middlewares/imagekits");
const auth = require("../middlewares/auth");
const restrictTo = require("../middlewares/restrictTo");

router.post(
  "/",

  uploadCDN.single("images"),
  uploadImageKit(false),
  validate(createUserSchema),
  createUser
);

router.post(
  "/local",
  auth,
  restrictTo("admin"),
  uploadLocal.single("images"),
  validate(createUserSchema),
  createUser
);

router.get("/", auth, restrictTo("admin"), getAllUsers);

router.get("/:id", getUserById);

router.put("/:id", validate(updateUserPutSchema), updateUserPutMethod);

router.patch("/:id", validate(updateUserSchema), updateUserPatchMethod);

router.delete("/:id", auth, restrictTo("admin"), deleteUser);


module.exports = router;
