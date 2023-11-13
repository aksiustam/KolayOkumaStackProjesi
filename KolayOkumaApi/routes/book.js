const express = require("express");
const {
  allBooks,
  detailBook,
  createBook,
  deleteBook,
  updateBook,
} = require("../controllers/book.js");
const { authenticateWithJwt } = require("../middleware/jwt.js");
const { checkIsInRole } = require("../middleware/auth.js");
const router = express.Router();

const upload = require("../helpers/uploadHelper.js");

router.get("/books", allBooks);
router.get("/book/:id", detailBook);
router.post(
  "/book/new",
  upload.fields([
    {
      name: "imageURL",
      maxCount: 1,
    },
    {
      name: "epubURL",
      maxCount: 1,
    },
  ]),
  authenticateWithJwt,
  checkIsInRole("admin"),
  createBook
);
router.delete(
  "/book/:id",
  authenticateWithJwt,
  checkIsInRole("admin"),
  deleteBook
);

module.exports = router;
