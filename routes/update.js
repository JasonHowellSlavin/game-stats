const express = require('express');
const router = express.Router();

const updateController = require('../controllers/updateController');

router.post('/', updateController.update);

router.post('/edit', updateController.edit);

module.exports = router;
