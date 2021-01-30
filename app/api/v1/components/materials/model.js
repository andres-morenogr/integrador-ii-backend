const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const material = new Schema({
  id: String,
  projectId: String,
  creationDate: { type: Date, default: Date.now },
  description: String,
  type: String,
  amount: Number,
})

module.exports = mongoose.model("Materials", material);
