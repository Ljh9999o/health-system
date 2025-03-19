const DoctorWorkload = require('../models/doctorWorkloadModel');

const doctorWorkloadController = {
    // 记录医生工作量
    async recordWorkload(req, res) {
        try {
            const { doctor_id, workload_date, patient_count, service_hours } = req.body;
            const result = await DoctorWorkload.create({ doctor_id, workload_date, patient_count, service_hours });
            res.status(201).json({ message: '工作量记录成功', result });
        } catch (error) {
            res.status(500).json({ message: '工作量记录失败', error });
        }
    },

    // 查询医生的工作量
    async getWorkloadByDoctorId(req, res) {
        try {
            const { doctor_id } = req.params;
            const workload = await DoctorWorkload.findByDoctorId(doctor_id);
            res.status(200).json({ message: '查询成功', workload });
        } catch (error) {
            res.status(500).json({ message: '查询失败', error });
        }
    },

    // 查询医生的工作量统计
    async getStatisticsByDoctorId(req, res) {
        try {
            const { doctor_id } = req.params;
            const statistics = await DoctorWorkload.getStatisticsByDoctorId(doctor_id);
            res.status(200).json({ message: '查询成功', statistics });
        } catch (error) {
            res.status(500).json({ message: '查询失败', error });
        }
    }
};

module.exports = doctorWorkloadController;