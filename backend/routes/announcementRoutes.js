const express = require('express');
const announcementController = require('../controllers/announcementController');

const router = express.Router();

// 发布公告
router.post('/announcements', announcementController.createAnnouncement);

// 查询所有公告
router.get('/announcements', announcementController.getAllAnnouncements);

// 删除公告
router.delete('/announcements/:id', announcementController.deleteAnnouncement);

module.exports = router;