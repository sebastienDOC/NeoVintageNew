const crypto = require('crypto');
const { hashedPassword } = require('../config/environment');

const validatePassword = (req, res, next) => {
  const password = req.headers.password || req.body.password;
  
  if (!password) {
    return res.status(401).json({ error: 'Mot de passe requis' });
  }

  const hashedInput = crypto.createHash('sha256').update(password).digest('hex');
  if (hashedInput !== hashedPassword) {
    return res.status(403).json({ error: 'Mot de passe incorrect' });
  }

  next();
};

module.exports = { validatePassword };