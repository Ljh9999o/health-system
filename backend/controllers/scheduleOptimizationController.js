const ScheduleOptimization = require('../models/scheduleOptimizationModel');

const scheduleOptimizationController = {
    // 优化医生排班
    async optimizeSchedule(req, res) {
        try {
            const { doctor_id } = req.params;
            const optimizedSchedule = await ScheduleOptimization.optimizeSchedule(doctor_id);
            res.status(200).json({ message: '排班优化成功', optimizedSchedule });
        } catch (error) {
            res.status(500).json({ message: '排班优化失败', error });
        }
    }
};

module.exports = scheduleOptimizationController;