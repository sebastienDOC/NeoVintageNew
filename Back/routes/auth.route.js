const express = require('express');
const router = express.Router();
const { validatePassword } = require('../middleware/auth.middleware');

router.post('/validate-password', validatePassword, (req, res) => {
  res.status(200).json({ message: 'Mot de passe valide' });
});

module.exports = router;