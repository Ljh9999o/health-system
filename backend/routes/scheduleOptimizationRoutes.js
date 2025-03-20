const express = require('express');
const scheduleOptimizationController = require('../controllers/scheduleOptimizationController');

const router = express.Router();

// 优化医生排班
router.get('/:doctor_id', scheduleOptimizationController.optimizeSchedule);

module.exports = router;