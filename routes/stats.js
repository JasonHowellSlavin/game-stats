const express = require('express');
const router = express.Router();

const statsController = require('../controllers/statsController');

router.get('/', statsController.stats);

router.get('/update', statsController.update);

router.post('/daily-stats', statsController.dailyStats)

module.exports = router;
