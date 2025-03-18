const express = require('express');
const checkupReminderController = require('../controllers/checkupReminderController');

const router = express.Router();

// 创建体检提醒
router.post('/', checkupReminderController.createReminder);

// 查询用户的体检提醒
router.get('/:user_id', checkupReminderController.getRemindersByUserId);

// 删除体检提醒
router.delete('/:id', checkupReminderController.deleteReminder);

module.exports = router;