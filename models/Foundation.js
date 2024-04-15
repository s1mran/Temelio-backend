const mongoose = require("mongoose");

const Schema = mongoose.Schema; 

const Foundation = new Schema({
  email: {
    type: String,
    unique: true,
  },
  name: String,
  createdAt: {
    immutable: true,
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("foundations", Foundation)