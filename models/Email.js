const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const Email = new mongoose.Schema({
  message: String,
  sentAt: {
    type: Date,
    default: Date.now,
    immutable: true,
  },
  recievers: [{
    name: String,
    email: String,
    address: String
  }],
  foundation:  String
});

module.exports = mongoose.model("emails", Email)