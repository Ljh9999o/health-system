const express = require('express');
const appointmentController = require('../controllers/appointmentController');

const router = express.Router();

// 创建预约
router.post('/', appointmentController.createAppointment);

// 查询用户的预约记录
router.get('/:user_id', appointmentController.getAppointmentsByUserId);

// 更新预约状态
router.put('/:id/status', appointmentController.updateAppointmentStatus);

module.exports = router;