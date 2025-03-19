const HealthReport = require('../models/healthReportModel');

const healthReportController = {
    // 生成健康报告
    async generateReport(req, res) {
        try {
            const { user_id, report_date, report_content } = req.body;
            const result = await HealthReport.create({ user_id, report_date, report_content });
            res.status(201).json({ message: '健康报告生成成功', result });
        } catch (error) {
            res.status(500).json({ message: '健康报告生成失败', error });
        }
    },

    // 查询用户的健康报告
    async getReportsByUserId(req, res) {
        try {
            const { user_id } = req.params;
            const reports = await HealthReport.findByUserId(user_id);
            res.status(200).json({ message: '查询成功', reports });
        } catch (error) {
            res.status(500).json({ message: '查询失败', error });
        }
    },

    // 删除健康报告
    async deleteReport(req, res) {
        try {
            const { id } = req.params;
            const result = await HealthReport.deleteById(id);
            res.status(200).json({ message: '健康报告删除成功', result });
        } catch (error) {
            res.status(500).json({ message: '健康报告删除失败', error });
        }
    }
};

module.exports = healthReportController;