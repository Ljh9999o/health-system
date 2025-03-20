const PerformanceReport = require('../models/performanceReportModel');

const performanceReportController = {
    async generateReport(req, res) {
        try {
            const { doctor_id } = req.params;
            const workbook = await PerformanceReport.generateReport(doctor_id);

            res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
            res.attachment('performance_report.xlsx');
            await workbook.xlsx.write(res);
            res.end();
        } catch (error) {
            res.status(500).json({ message: '报告生成失败', error });
        }
    }
};

module.exports = performanceReportController;