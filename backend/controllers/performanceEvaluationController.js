const PerformanceEvaluation = require('../models/performanceEvaluationModel');

const performanceEvaluationController = {
    // 获取绩效评估数据
    async getEvaluationData(req, res) {
        try {
            const { doctor_id } = req.params;
            const evaluationData = await PerformanceEvaluation.getEvaluationData(doctor_id);
            res.status(200).json({ message: '查询成功', evaluationData });
        } catch (error) {
            res.status(500).json({ message: '查询失败', error });
        }
    }
};

module.exports = performanceEvaluationController;