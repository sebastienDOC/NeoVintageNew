require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const crypto = require('crypto');
const mongoose = require('mongoose');
const { Photo, Creator } = require('./db');

const app = express();
const HASHED_PASSWORD = process.env.HASHED_PASSWORD;

app.use(cors());
app.use(bodyParser.json());

mongoose.connect(process.env.MONGODB_URL);

app.get('/photos', async (req, res) => {
  try {
    const photos = await Photo.find();
    res.json(photos);
  } catch (err) {
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

app.put('/photos', async (req, res) => {
  const { password } = req.headers;
  if (!password) return res.status(401).json({ error: 'Mot de passe requis' });

  const hashedInput = crypto.createHash('sha256').update(password).digest('hex');
  if (hashedInput !== HASHED_PASSWORD) return res.status(403).json({ error: 'Mot de passe incorrect' });

  try {
    await Photo.deleteMany({});
    await Photo.insertMany(req.body);
    res.json({ message: 'Photos mises à jour' });
  } catch (err) {
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

app.get('/creators', async (req, res) => {
  try {
    const creators = await Creator.find();
    res.json(creators);
  } catch (err) {
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

app.put('/creators', async (req, res) => {
  const { password } = req.headers;
  if (!password) return res.status(401).json({ error: 'Mot de passe requis' });

  const hashedInput = crypto.createHash('sha256').update(password).digest('hex');
  if (hashedInput !== HASHED_PASSWORD) return res.status(403).json({ error: 'Mot de passe incorrect' });

  try {
    await Creator.deleteMany({});
    await Creator.insertMany(req.body);
    res.json({ message: 'Creators mis à jour' });
  } catch (err) {
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

app.post('/validate-password', (req, res) => {
  const { password } = req.body;
  if (!password) return res.status(400).json({ error: 'Mot de passe requis' });

  const hashedInput = crypto.createHash('sha256').update(password).digest('hex');
  if (hashedInput !== HASHED_PASSWORD) return res.status(403).json({ error: 'Mot de passe incorrect' });

  res.status(200).json({ message: 'Mot de passe valide' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server: ${PORT}`));