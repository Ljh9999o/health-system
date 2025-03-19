const express = require('express');
const doctorWorkloadController = require('../controllers/doctorWorkloadController');

const router = express.Router();

// 记录医生工作量
router.post('/', doctorWorkloadController.recordWorkload);

// 查询医生的工作量
router.get('/:doctor_id', doctorWorkloadController.getWorkloadByDoctorId);

// 查询医生的工作量统计
router.get('/:doctor_id/statistics', doctorWorkloadController.getStatisticsByDoctorId);

module.exports = router;