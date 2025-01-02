const mongoose = require('mongoose');

const PhotoSchema = mongoose.Schema({
  title: String,
  url: String
});

const CreatorSchema = mongoose.Schema({
  title: String,
  subtitle: String,
  image: String,
  url: String
});

const Photo = mongoose.model('Photo', PhotoSchema);
const Creator = mongoose.model('Creator', CreatorSchema);

module.exports = { Photo, Creator };