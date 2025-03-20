const db = require('../utils/db');
const ExcelJS = require('exceljs');

class PerformanceReport {
    static async generateReport(doctor_id) {
        const [rows] = await db.execute(
            `SELECT workload_date, patient_count, service_hours
             FROM doctor_workload
             WHERE doctor_id = ?
             ORDER BY workload_date`,
            [doctor_id]
        );

        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet('Performance Report');

        worksheet.columns = [
            { header: 'Date', key: 'workload_date', width: 15 },
            { header: 'Patient Count', key: 'patient_count', width: 15 },
            { header: 'Service Hours', key: 'service_hours', width: 15 }
        ];

        rows.forEach(row => worksheet.addRow(row));

        return workbook;
    }
}

module.exports = PerformanceReport;