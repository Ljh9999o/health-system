const express = require('express');
const reminderController = require('../controllers/reminderController');

const router = express.Router();

// 创建提醒
router.post('/', reminderController.createReminder);

// 查询用户的提醒
router.get('/:user_id', reminderController.getRemindersByUserId);

// 删除提醒
router.delete('/:id', reminderController.deleteReminder);

module.exports = router;