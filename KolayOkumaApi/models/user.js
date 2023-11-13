const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    role: {
      type: String,
      default: "user",
    },
  },
  { collection: "User", timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
