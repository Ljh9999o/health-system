const db = require('../utils/db');

class HealthReport {
    static async create(report) {
        const { user_id, report_date, report_content } = report;
        const [result] = await db.execute(
            'INSERT INTO health_reports (user_id, report_date, report_content) VALUES (?, ?, ?)',
            [user_id, report_date, report_content]
        );
        return result;
    }

    static async findByUserId(user_id) {
        const [rows] = await db.execute('SELECT * FROM health_reports WHERE user_id = ?', [user_id]);
        return rows;
    }

    static async deleteById(id) {
        const [result] = await db.execute('DELETE FROM health_reports WHERE id = ?', [id]);
        return result;
    }
}

module.exports = HealthReport;