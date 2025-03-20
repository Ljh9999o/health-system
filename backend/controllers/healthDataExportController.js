const HealthData = require('../models/healthDataModel');
const { Parser } = require('json2csv');
const ExcelJS = require('exceljs');

const healthDataExportController = {
    // 导出健康数据为 CSV
    async exportToCSV(req, res) {
        try {
            const { user_id } = req.params;
            const data = await HealthData.findByUserId(user_id);

            const fields = ['id', 'user_id', 'data_type', 'value', 'recorded_at'];
            const json2csvParser = new Parser({ fields });
            const csv = json2csvParser.parse(data);

            res.header('Content-Type', 'text/csv');
            res.attachment('health_data.csv');
            res.send(csv);
        } catch (error) {
            res.status(500).json({ message: '导出失败', error });
        }
    },

    // 导出健康数据为 Excel
    async exportToExcel(req, res) {
        try {
            const { user_id } = req.params;
            const data = await HealthData.findByUserId(user_id);

            const workbook = new ExcelJS.Workbook();
            const worksheet = workbook.addWorksheet('Health Data');

            worksheet.columns = [
                { header: 'ID', key: 'id', width: 10 },
                { header: 'User ID', key: 'user_id', width: 10 },
                { header: 'Data Type', key: 'data_type', width: 15 },
                { header: 'Value', key: 'value', width: 10 },
                { header: 'Recorded At', key: 'recorded_at', width: 20 }
            ];

            data.forEach(row => worksheet.addRow(row));

            res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
            res.attachment('health_data.xlsx');
            await workbook.xlsx.write(res);
            res.end();
        } catch (error) {
            res.status(500).json({ message: '导出失败', error });
        }
    }
};

module.exports = healthDataExportController;