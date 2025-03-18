const db = require('../utils/db');

class Consultation {
    static async create(consultation) {
        const { user_id, question } = consultation;
        const [result] = await db.execute(
            'INSERT INTO consultations (user_id, question) VALUES (?, ?)',
            [user_id, question]
        );
        return result;
    }

    static async findByUserId(user_id) {
        const [rows] = await db.execute('SELECT * FROM consultations WHERE user_id = ?', [user_id]);
        return rows;
    }

    static async updateAnswer(id, answer) {
        const [result] = await db.execute(
            'UPDATE consultations SET answer = ? WHERE id = ?',
            [answer, id]
        );
        return result;
    }
}

module.exports = Consultation;