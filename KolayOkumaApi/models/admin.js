const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    password: {
      type: String,
    },
    role: {
      type: String,
      default: "admin",
    },
  },
  { collection: "Admin", timestamps: true }
);

module.exports = mongoose.model("Admin", adminSchema);
