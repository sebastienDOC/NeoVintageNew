const express = require('express');
const router = express.Router();
const { validatePassword } = require('../middleware/auth.middleware');
const photoController = require('../controllers/photo.controller');

router.get('/', photoController.getAllPhotos);
router.put('/', validatePassword, photoController.updatePhotos);

module.exports = router;