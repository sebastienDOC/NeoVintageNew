const crypto = require('crypto');
const password = 'Z9a81sd2'; // Mot de passe attendu
const hash = crypto.createHash('sha256').update(password).digest('hex');
console.log(hash);
