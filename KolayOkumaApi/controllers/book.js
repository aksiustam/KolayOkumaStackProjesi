const Book = require("../models/book.js");
const fs = require("fs");

const allBooks = async (req, res) => {
  try {
    const books = await Book.find();
    res.status(200).json(books);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const detailBook = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);

    res.status(200).json(book);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createBook = async (req, res, next) => {
  try {
    const book = new Book({
      name: req.body.name,
      imageUrl: req.files.imageURL[0].path,
      epubUrl: req.files.epubURL[0].path,
    });

    await Book.create(book);

    res.status(200).json("Kitap Başarıyla Eklendi");
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteBook = async (req, res, next) => {
  try {
    const book = await Book.findById(req.params.id);
    const path1 = book.imageUrl;
    const path2 = book.epubUrl;
    fs.unlink(path1, (err) => {
      if (err) {
        console.error(err);
        return;
      }
    });
    fs.unlink(path2, (err) => {
      if (err) {
        console.error(err);
        return;
      }
    });

    await book.deleteOne();
    res.status(200).json({ message: "Kitap başarıyla silindi!!!" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  allBooks,
  detailBook,
  createBook,
  deleteBook,
};
