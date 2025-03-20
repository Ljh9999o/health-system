const db = require('../utils/db');

class HealthVisualization {
    static async getTrendData(user_id, data_type) {
        const [rows] = await db.execute(
            `SELECT recorded_at, value
             FROM health_data
             WHERE user_id = ? AND data_type = ?
             ORDER BY recorded_at`,
            [user_id, data_type]
        );
        return rows;
    }
}

module.exports = HealthVisualization;