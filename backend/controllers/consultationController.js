const Consultation = require('../models/consultationModel');

const consultationController = {
    // 用户提问
    async addQuestion(req, res) {
        try {
            const { user_id, question } = req.body;
            const result = await Consultation.create({ user_id, question });
            res.status(201).json({ message: '提问成功', result });
        } catch (error) {
            res.status(500).json({ message: '提问失败', error });
        }
    },

    // 查询用户提问
    async getQuestionsByUserId(req, res) {
        try {
            const { user_id } = req.params;
            const questions = await Consultation.findByUserId(user_id);
            res.status(200).json({ message: '查询成功', questions });
        } catch (error) {
            res.status(500).json({ message: '查询失败', error });
        }
    },

    // 管理员回答问题
    async answerQuestion(req, res) {
        try {
            const { id } = req.params;
            const { answer } = req.body;
            const result = await Consultation.updateAnswer(id, answer);
            res.status(200).json({ message: '回答成功', result });
        } catch (error) {
            res.status(500).json({ message: '回答失败', error });
        }
    }
};

module.exports = consultationController;