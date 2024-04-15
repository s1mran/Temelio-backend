const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const NonProfit = new Schema({
  email: {
    type: String,
    unique: true,
  },
  name: String,
  address: String,
  foundations: [String],
  createdAt: {
    immutable: true,
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("nonprofits", NonProfit);
