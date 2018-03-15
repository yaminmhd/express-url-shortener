const mongoose = require('mongoose');

const urlSchema = new mongoose.Schema({
  _id: Number,
  url: String,
  created_at: {
    type: Date,
    default: Date.now
  }
});

const Url = mongoose.model('Url', urlSchema);

module.exports = Url;