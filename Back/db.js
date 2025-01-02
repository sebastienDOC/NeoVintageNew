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

const Photo = mongoose.model('Photo', PhotoSchema, 'Photos');
const Creator = mongoose.model('Creator', CreatorSchema, 'Creators');

module.exports = { Photo, Creator };