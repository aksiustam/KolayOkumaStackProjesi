const mongoose = require("mongoose");

const videoSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    videoUrl: {
      type: String,
    },
    short: {
      type: Boolean,
    },
  },
  { collection: "Video", timestamps: true }
);

module.exports = mongoose.model("Video", videoSchema);
