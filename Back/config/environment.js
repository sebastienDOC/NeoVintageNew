require('dotenv').config();

module.exports = {
  port: process.env.PORT || 3000,
  mongodbUrl: process.env.MONGODB_URL,
  hashedPassword: process.env.HASHED_PASSWORD,
  apiUrl: process.env.API_URL
};