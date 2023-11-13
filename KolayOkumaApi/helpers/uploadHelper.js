const multer = require("multer");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    if (file.fieldname === "imageURL") {
      // if uploading resume
      cb(null, "./public/images");
    } else {
      // else uploading image
      cb(null, "./public/book");
    }
  },
  filename: (req, file, cb) => {
    cb(
      null,
      new Date().toISOString().replace(/:/g, "-") + "-" + file.originalname
    );
  },
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype === "application/epub+zip") {
    cb(null, true);
  } else {
    cb(null, false);
  }
};
const upload = multer({ storage });

module.exports = upload;
