const mongoose = require('mongoose');

const CreatorSchema = mongoose.Schema({
  title: String,
  subtitle: String,
  image: String,
  url: String
});

module.exports = mongoose.model('Creator', CreatorSchema, 'Creators');