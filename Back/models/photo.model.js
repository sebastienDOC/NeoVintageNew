const mongoose = require('mongoose');

const PhotoSchema = mongoose.Schema({
  title: String,
  url: String
});

module.exports = mongoose.model('Photo', PhotoSchema, 'Photos');