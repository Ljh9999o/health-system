const Review = require('../models/reviewModel');

const reviewController = {
    // 创建评价
    async createReview(req, res) {
        try {
            const { user_id, doctor_id, rating, comment } = req.body;
            const result = await Review.create({ user_id, doctor_id, rating, comment });
            res.status(201).json({ message: '评价创建成功', result });
        } catch (error) {
            res.status(500).json({ message: '评价创建失败', error });
        }
    },

    // 查询医生的评价
    async getReviewsByDoctorId(req, res) {
        try {
            const { doctor_id } = req.params;
            const reviews = await Review.findByDoctorId(doctor_id);
            res.status(200).json({ message: '查询成功', reviews });
        } catch (error) {
            res.status(500).json({ message: '查询失败', error });
        }
    },

     // 查询用户的评价历史
    async getReviewsByUserId(req, res) {
        try {
            const { user_id } = req.params;
            const reviews = await Review.findByUserId(user_id); // 需要模型支持此方法
            res.status(200).json({ message: '查询成功', reviews });
        } catch (error) {
            res.status(500).json({ message: '查询失败', error });
        }
    },

    // 删除评价
    async deleteReview(req, res) {
        try {
            const { id } = req.params;
            const result = await Review.deleteById(id);
            res.status(200).json({ message: '评价删除成功', result });
        } catch (error) {
            res.status(500).json({ message: '评价删除失败', error });
        }
    }
};

module.exports = reviewController;