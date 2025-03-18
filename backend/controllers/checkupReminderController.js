const CheckupReminder = require('../models/checkupReminderModel');

const checkupReminderController = {
    // 创建体检提醒
    async createReminder(req, res) {
        try {
            const { user_id, reminder_date, message } = req.body;
            const result = await CheckupReminder.create({ user_id, reminder_date, message });
            res.status(201).json({ message: '体检提醒创建成功', result });
        } catch (error) {
            res.status(500).json({ message: '体检提醒创建失败', error });
        }
    },

    // 查询用户的体检提醒
    async getRemindersByUserId(req, res) {
        try {
            const { user_id } = req.params;
            const reminders = await CheckupReminder.findByUserId(user_id);
            res.status(200).json({ message: '查询成功', reminders });
        } catch (error) {
            res.status(500).json({ message: '查询失败', error });
        }
    },

    // 删除体检提醒
    async deleteReminder(req, res) {
        try {
            const { id } = req.params;
            const result = await CheckupReminder.deleteById(id);
            res.status(200).json({ message: '体检提醒删除成功', result });
        } catch (error) {
            res.status(500).json({ message: '体检提醒删除失败', error });
        }
    }
};

module.exports = checkupReminderController;