const db = require('../utils/db');

class Appointment {
    static async create(appointment) {
        const { user_id, doctor_id, appointment_date } = appointment;
        const [result] = await db.execute(
            'INSERT INTO appointments (user_id, doctor_id, appointment_date) VALUES (?, ?, ?)',
            [user_id, doctor_id, appointment_date]
        );
        return result;
    }

    static async findByUserId(user_id) {
        const [rows] = await db.execute('SELECT * FROM appointments WHERE user_id = ?', [user_id]);
        return rows;
    }

    static async updateStatus(id, status) {
        const [result] = await db.execute(
            'UPDATE appointments SET status = ? WHERE id = ?',
            [status, id]
        );
        return result;
    }
}

module.exports = Appointment;