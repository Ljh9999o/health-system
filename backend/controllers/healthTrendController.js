const HealthTrend = require('../models/healthTrendModel');

const healthTrendController = {
    // 获取健康趋势数据
    async getTrendData(req, res) {
        try {
            const { user_id, data_type } = req.params;
            const trendData = await HealthTrend.getTrendData(user_id, data_type);
            res.status(200).json({ message: '查询成功', trendData });
        } catch (error) {
            res.status(500).json({ message: '查询失败', error });
        }
    }
};

module.exports = healthTrendController;