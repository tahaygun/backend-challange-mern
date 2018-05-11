const mongoose = require("mongoose");
const Schema = mongoose.Schema;

var ArticleSchema = new Schema({
  title: {
    type: String,
    require: true
  },
  summary: {
    type: String,
    require: true
  },
  article: {
    type: String,
    require: true
  },
  keywords: {
    type: String,
    require: true
  },
  user: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "User"
  },
  createdAt: {
    type: Date,
    required: true,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    required: true,
    default: Date.now
  }
});

module.exports = Article = mongoose.model("Article", ArticleSchema);
