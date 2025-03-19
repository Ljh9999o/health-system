const express = require('express');
const healthTrendController = require('../controllers/healthTrendController');

const router = express.Router();

// 获取健康趋势数据
router.get('/:user_id/:data_type', healthTrendController.getTrendData);

module.exports = router;