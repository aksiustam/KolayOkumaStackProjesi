const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    imageUrl: {
      type: String,
    },
    epubUrl: {
      type: String,
    },
    users: [
      {
        user: { type: mongoose.Schema.ObjectId, ref: "User" },
      },
    ],
  },
  { collection: "Book", timestamps: true }
);

module.exports = mongoose.model("Book", bookSchema);
