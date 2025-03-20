const express = require('express');
const performanceReportController = require('../controllers/performanceReportController');

const router = express.Router();

// 生成绩效报告
router.get('/:doctor_id', performanceReportController.generateReport);

module.exports = router;