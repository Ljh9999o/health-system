const Schedule = require('../models/scheduleModel');

const scheduleController = {
    // 创建排班
    async createSchedule(req, res) {
        try {
            const { doctor_id, schedule_date, start_time, end_time } = req.body;
            const result = await Schedule.create({ doctor_id, schedule_date, start_time, end_time });
            res.status(201).json({ message: '排班创建成功', result });
        } catch (error) {
            res.status(500).json({ message: '排班创建失败', error });
        }
    },

    // 查询医生的排班
    async getSchedulesByDoctorId(req, res) {
        try {
            const { doctor_id } = req.params;
            const schedules = await Schedule.findByDoctorId(doctor_id);
            res.status(200).json({ message: '查询成功', schedules });
        } catch (error) {
            res.status(500).json({ message: '查询失败', error });
        }
    },

    // 删除排班
    async deleteSchedule(req, res) {
        try {
            const { id } = req.params;
            const result = await Schedule.deleteById(id);
            res.status(200).json({ message: '排班删除成功', result });
        } catch (error) {
            res.status(500).json({ message: '排班删除失败', error });
        }
    }
};

module.exports = scheduleController;