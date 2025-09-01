const multer = require("multer");
const path = require("path");

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/jpeg" ||
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg"
  ) {
    cb(null, true);
  } else {
    cb(new Error("Only .jpeg, .jpg and .png files are allowed"), false);
  }
};

const disStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads");
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    const fileName = `${Date.now()}-${file.fieldname}${ext}`;
    cb(null, fileName);
  },
});

const memoryStorage = multer.memoryStorage();

const uploadLocal = multer({
  storage: disStorage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 },
});

const uploadCDN = multer({
  storage: memoryStorage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 },
});

module.exports = {
  uploadLocal,
  uploadCDN,
};
