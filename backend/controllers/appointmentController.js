const Appointment = require('../models/appointmentModel');

const appointmentController = {
    // 创建预约
    async createAppointment(req, res) {
        try {
            const { user_id, doctor_id, appointment_date } = req.body;
            const result = await Appointment.create({ user_id, doctor_id, appointment_date });
            res.status(201).json({ message: '预约创建成功', result });
        } catch (error) {
            res.status(500).json({ message: '预约创建失败', error });
        }
    },

    // 查询用户的预约记录
    async getAppointmentsByUserId(req, res) {
        try {
            const { user_id } = req.params;
            const appointments = await Appointment.findByUserId(user_id);
            res.status(200).json({ message: '查询成功', appointments });
        } catch (error) {
            res.status(500).json({ message: '查询失败', error });
        }
    },

    // 更新预约状态
    async updateAppointmentStatus(req, res) {
        try {
            const { id } = req.params;
            const { status } = req.body;
            const result = await Appointment.updateStatus(id, status);
            res.status(200).json({ message: '预约状态更新成功', result });
        } catch (error) {
            res.status(500).json({ message: '预约状态更新失败', error });
        }
    }
};

module.exports = appointmentController;