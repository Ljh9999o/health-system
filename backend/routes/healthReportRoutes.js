const express = require('express');
const healthReportController = require('../controllers/healthReportController');

const router = express.Router();

// 生成健康报告
router.post('/', healthReportController.generateReport);

// 查询用户的健康报告
router.get('/:user_id', healthReportController.getReportsByUserId);

// 删除健康报告
router.delete('/:id', healthReportController.deleteReport);

module.exports = router;