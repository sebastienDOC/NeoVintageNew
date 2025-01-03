require('../config/environment');
const connectDB = require('../config/database');
const Photo = require('../models/photo.model');
const Creator = require('../models/creator.model');
const photos = require('../data/photos.json');
const creators = require('../data/creators.json');

async function initDb() {
  await connectDB();
  
  await Photo.deleteMany({});
  await Creator.deleteMany({});
  
  await Photo.insertMany(photos);
  await Creator.insertMany(creators);
  
  console.log('Base de données initialisée');
  process.exit(0);
}

initDb();