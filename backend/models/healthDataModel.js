const db = require('../utils/db');

class HealthData {
    static async create(data) {
        const { user_id, data_type, value, recorded_at } = data;
        const [result] = await db.execute(
            'INSERT INTO health_data (user_id, data_type, value, recorded_at) VALUES (?, ?, ?, ?)',
            [user_id, data_type, value, recorded_at]
        );
        return result;
    }

    static async findByUserId(user_id) {
        const [rows] = await db.execute('SELECT * FROM health_data WHERE user_id = ?', [user_id]);
        return rows;
    }

    static async getStatisticsByUserId(user_id) {
        const [rows] = await db.execute(
            `SELECT data_type, AVG(value) AS avg_value, MIN(value) AS min_value, MAX(value) AS max_value
             FROM health_data
             WHERE user_id = ?
             GROUP BY data_type`,
            [user_id]
        );
        return rows;
    }
}

module.exports = HealthData;