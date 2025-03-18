const express = require('express');
const pointController = require('../controllers/pointController');

const router = express.Router();

// 增加积分
router.post('/points', pointController.addPoints);

// 查询用户总积分
router.get('/points/:user_id', pointController.getTotalPoints);

module.exports = router;