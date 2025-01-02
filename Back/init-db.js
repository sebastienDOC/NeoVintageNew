require('dotenv').config();
const mongoose = require('mongoose');
const { Photo, Creator } = require('./db');
const photos = require('./data/photos.json');
const creators = require('./data/creators.json');

async function initDb() {
  await mongoose.connect(process.env.MONGODB_URL);
  
  await Photo.deleteMany({});
  await Creator.deleteMany({});
  
  await Photo.insertMany(photos);
  await Creator.insertMany(creators);
  
  console.log('Base de données initialisée');
  process.exit(0);
}

initDb();