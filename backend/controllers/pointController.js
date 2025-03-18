const Point = require('../models/pointModel');

const pointController = {
    // 增加积分
    async addPoints(req, res) {
        try {
            const { user_id, points } = req.body;
            const result = await Point.addPoints(user_id, points);
            res.status(201).json({ message: '积分增加成功', result });
        } catch (error) {
            res.status(500).json({ message: '积分增加失败', error });
        }
    },

    // 查询用户总积分
    async getTotalPoints(req, res) {
        try {
            const { user_id } = req.params;
            const total_points = await Point.getTotalPoints(user_id);
            res.status(200).json({ message: '查询成功', total_points });
        } catch (error) {
            res.status(500).json({ message: '查询失败', error });
        }
    }
};

module.exports = pointController;