const express = require('express');
const healthVisualizationController = require('../controllers/healthVisualizationController');

const router = express.Router();

// 获取健康趋势数据
router.get('/:user_id/:data_type', healthVisualizationController.getTrendData);

module.exports = router;