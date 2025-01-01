require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const cors = require('cors');
const crypto = require('crypto');

const app = express();
const PHOTOS_FILE = process.env.VERCEL ? '/tmp/photos.json' : './data/photos.json';
const CREATORS_FILE = process.env.VERCEL ? '/tmp/creators.json' : './data/creators.json';
const HASHED_PASSWORD = process.env.HASHED_PASSWORD || 'd15cca3d5854f840515eeef18906ec66607a76da67b9c5688ec976c4bac5ba28';

app.use(cors());
app.use(bodyParser.json());

// Photos routes
app.get('/photos', (req, res) => {
  fs.readFile(PHOTOS_FILE, 'utf8', (err, data) => {
    if (err) return res.status(500).json({ error: 'Erreur serveur' });
    res.json(JSON.parse(data));
  });
});

app.put('/photos', (req, res) => {
  const { password } = req.headers;
  if (!password) return res.status(401).json({ error: 'Mot de passe requis' });

  const hashedInput = crypto.createHash('sha256').update(password).digest('hex');
  if (hashedInput !== HASHED_PASSWORD) return res.status(403).json({ error: 'Mot de passe incorrect' });

  fs.writeFile(PHOTOS_FILE, JSON.stringify(req.body, null, 2), 'utf8', err => {
    if (err) return res.status(500).json({ error: 'Erreur serveur' });
    res.json({ message: 'Photos mises à jour' });
  });
});

// Creators routes
app.get('/creators', (req, res) => {
  fs.readFile(CREATORS_FILE, 'utf8', (err, data) => {
    if (err) return res.status(500).json({ error: 'Erreur serveur' });
    res.json(JSON.parse(data));
  });
});

app.put('/creators', (req, res) => {
  const { password } = req.headers;
  if (!password) return res.status(401).json({ error: 'Mot de passe requis' });

  const hashedInput = crypto.createHash('sha256').update(password).digest('hex');
  if (hashedInput !== HASHED_PASSWORD) return res.status(403).json({ error: 'Mot de passe incorrect' });

  fs.writeFile(CREATORS_FILE, JSON.stringify(req.body, null, 2), 'utf8', err => {
    if (err) return res.status(500).json({ error: 'Erreur serveur' });
    res.json({ message: 'Creators mis à jour' });
  });
});

// Password validation
app.post('/validate-password', (req, res) => {
  const { password } = req.body;
  if (!password) return res.status(400).json({ error: 'Mot de passe requis' });

  const hashedInput = crypto.createHash('sha256').update(password).digest('hex');
  if (hashedInput !== HASHED_PASSWORD) return res.status(403).json({ error: 'Mot de passe incorrect' });

  res.status(200).json({ message: 'Mot de passe valide' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server: ${PORT}`));