const Reminder = require('../models/reminderModel');

const reminderController = {
    // 创建提醒
    async createReminder(req, res) {
        try {
            const { user_id, reminder_type, reminder_date, message } = req.body;
            const result = await Reminder.create({ user_id, reminder_type, reminder_date, message });
            res.status(201).json({ message: '提醒创建成功', result });
        } catch (error) {
            res.status(500).json({ message: '提醒创建失败', error });
        }
    },

    // 查询用户的提醒
    async getRemindersByUserId(req, res) {
        try {
            const { user_id } = req.params;
            const reminders = await Reminder.findByUserId(user_id);
            res.status(200).json({ message: '查询成功', reminders });
        } catch (error) {
            res.status(500).json({ message: '查询失败', error });
        }
    },

    // 删除提醒
    async deleteReminder(req, res) {
        try {
            const { id } = req.params;
            const result = await Reminder.deleteById(id);
            res.status(200).json({ message: '提醒删除成功', result });
        } catch (error) {
            res.status(500).json({ message: '提醒删除失败', error });
        }
    }
};

module.exports = reminderController;