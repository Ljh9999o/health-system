const express = require('express');
const dietPlanController = require('../controllers/dietPlanController');

const router = express.Router();

// 创建饮食计划
router.post('/', dietPlanController.createPlan);

// 查询用户的饮食计划
router.get('/:user_id', dietPlanController.getPlansByUserId);

// 删除饮食计划
router.delete('/:id', dietPlanController.deletePlan);

module.exports = router;