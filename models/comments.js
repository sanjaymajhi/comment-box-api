const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Comment = new Schema({
  name: { type: String, min: 1, required: true },
  value: { type: String, min: 1, required: true },
  time: { type: Date, default: Date.now },
  downvotes: { type: Number, default: 0 },
  upvotes: { type: Number, default: 0 },
});

module.exports = mongoose.model("Comment-Box", Comment);
