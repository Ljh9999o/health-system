const Announcement = require('../models/announcementModel');

const announcementController = {
    // 发布公告
    async createAnnouncement(req, res) {
        try {
            const { title, content } = req.body;
            const result = await Announcement.create({ title, content });
            res.status(201).json({ message: '公告发布成功', result });
        } catch (error) {
            res.status(500).json({ message: '公告发布失败', error });
        }
    },

    // 查询所有公告
    async getAllAnnouncements(req, res) {
        try {
            const announcements = await Announcement.findAll();
            res.status(200).json({ message: '查询成功', announcements });
        } catch (error) {
            res.status(500).json({ message: '查询失败', error });
        }
    },

    // 删除公告
    async deleteAnnouncement(req, res) {
        try {
            const { id } = req.params;
            const result = await Announcement.deleteById(id);
            res.status(200).json({ message: '公告删除成功', result });
        } catch (error) {
            res.status(500).json({ message: '公告删除失败', error });
        }
    }
};

module.exports = announcementController;