require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const cors = require('cors');
const crypto = require('crypto');

const app = express();
const JSON_FILE = process.env.VERCEL ? '/tmp/photos.json' : './photos.json';
const HASHED_PASSWORD = process.env.HASHED_PASSWORD || 'd15cca3d5854f840515eeef18906ec66607a76da67b9c5688ec976c4bac5ba28';
const API_BASE = process.env.API_URL || 'http://localhost:3000/api';

app.use(cors());
app.use(bodyParser.json());

app.get(`${API_BASE}/photos`, (req, res) => {
  fs.readFile(JSON_FILE, 'utf8', (err, data) => {
    if (err) {
      console.error('Erreur de lecture du fichier JSON', err);
      return res.status(500).json({ error: 'Erreur serveur' });
    }
    res.json(JSON.parse(data));
  });
});

app.put(`${API_BASE}/photos`, (req, res) => {
  const { password } = req.headers;
  if (!password) return res.status(401).json({ error: 'Mot de passe requis' });

  const hashedInput = crypto.createHash('sha256').update(password).digest('hex');
  if (hashedInput !== HASHED_PASSWORD) {
    return res.status(403).json({ error: 'Mot de passe incorrect' });
  }

  fs.writeFile(JSON_FILE, JSON.stringify(req.body, null, 2), 'utf8', err => {
    if (err) {
      console.error('Erreur d\'écriture', err);
      return res.status(500).json({ error: 'Erreur serveur' });
    }
    res.json({ message: 'Photos mises à jour' });
  });
});

app.post(`${API_BASE}/validate-password`, (req, res) => {
  const { password } = req.body;
  if (!password) return res.status(400).json({ error: 'Mot de passe requis' });

  const hashedInput = crypto.createHash('sha256').update(password).digest('hex');
  if (hashedInput !== HASHED_PASSWORD) {
    return res.status(403).json({ error: 'Mot de passe incorrect' });
  }

  res.status(200).json({ message: 'Mot de passe valide' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server: ${PORT}`));