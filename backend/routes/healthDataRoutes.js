const express = require('express');
const healthDataController = require('../controllers/healthDataController');
const router = express.Router();

// 记录健康数据
router.post('/', healthDataController.recordData);

// 查询用户的健康数据
router.get('/:user_id', healthDataController.getDataByUserId);

// 查询用户的健康数据统计
router.get('/:user_id/statistics', healthDataController.getStatisticsByUserId);

module.exports = router;