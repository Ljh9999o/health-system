const express = require('express');
const medicalRecordController = require('../controllers/medicalRecordController');

const router = express.Router();

// 添加病例
router.post('/records', medicalRecordController.addRecord);

// 查询用户病例
router.get('/records/:user_id', medicalRecordController.getRecordsByUserId);

module.exports = router;