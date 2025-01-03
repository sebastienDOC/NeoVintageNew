const express = require('express');
const router = express.Router();
const { validatePassword } = require('../middleware/auth.middleware');
const creatorController = require('../controllers/creator.controller');

router.get('/', creatorController.getAllCreators);
router.put('/', validatePassword, creatorController.updateCreators);

module.exports = router;