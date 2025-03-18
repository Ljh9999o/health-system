const express = require('express');
const healthPlanController = require('../controllers/healthPlanController');

const router = express.Router();

// 创建健康计划
router.post('/', healthPlanController.createPlan);

// 查询用户的健康计划
router.get('/:user_id', healthPlanController.getPlansByUserId);

// 删除健康计划
router.delete('/:id', healthPlanController.deletePlan);

module.exports = router;