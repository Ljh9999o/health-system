const express = require('express');
const scheduleController = require('../controllers/scheduleController');

const router = express.Router();

// 创建排班
router.post('/', scheduleController.createSchedule);

// 查询医生的排班
router.get('/:doctor_id', scheduleController.getSchedulesByDoctorId);

// 删除排班
router.delete('/:id', scheduleController.deleteSchedule);