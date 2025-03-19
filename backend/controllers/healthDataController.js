const HealthData = require('../models/healthDataModel');

const healthDataController = {
    // 记录健康数据
    async recordData(req, res) {
        try {
            const { user_id, data_type, value, recorded_at } = req.body;
            const result = await HealthData.create({ user_id, data_type, value, recorded_at });
            res.status(201).json({ message: '健康数据记录成功', result });
        } catch (error) {
            res.status(500).json({ message: '健康数据记录失败', error });
        }
    },

    // 查询用户的健康数据
    async getDataByUserId(req, res) {
        try {
            const { user_id } = req.params;
            const data = await HealthData.findByUserId(user_id);
            res.status(200).json({ message: '查询成功', data });
        } catch (error) {
            res.status(500).json({ message: '查询失败', error });
        }
    },

    // 查询用户的健康数据统计
    async getStatisticsByUserId(req, res) {
        try {
            const { user_id } = req.params;
            const statistics = await HealthData.getStatisticsByUserId(user_id);
            res.status(200).json({ message: '查询成功', statistics });
        } catch (error) {
            res.status(500).json({ message: '查询失败', error });
        }
    }
};

module.exports = healthDataController;