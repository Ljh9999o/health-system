const db = require('../utils/db');

class MedicalRecord {
    static async create(record) {
        const { user_id, record: content } = record;
        const [result] = await db.execute(
            'INSERT INTO medical_records (user_id, record) VALUES (?, ?)',
            [user_id, content]
        );
        return result;
    }

    static async findByUserId(user_id) {
        const [rows] = await db.execute('SELECT * FROM medical_records WHERE user_id = ?', [user_id]);
        return rows;
    }
}

module.exports = MedicalRecord;