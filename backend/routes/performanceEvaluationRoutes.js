const express = require('express');
const performanceEvaluationController = require('../controllers/performanceEvaluationController');

const router = express.Router();

// 获取绩效评估数据
router.get('/:doctor_id', performanceEvaluationController.getEvaluationData);

module.exports = router;