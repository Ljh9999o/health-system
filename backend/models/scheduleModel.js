const db = require('../utils/db');

class Schedule {
    static async create(schedule) {
        const { doctor_id, schedule_date, start_time, end_time } = schedule;
        const [result] = await db.execute(
            'INSERT INTO schedules (doctor_id, schedule_date, start_time, end_time) VALUES (?, ?, ?, ?)',
            [doctor_id, schedule_date, start_time, end_time]
        );
        return result;
    }

    static async findByDoctorId(doctor_id) {
        const [rows] = await db.execute('SELECT * FROM schedules WHERE doctor_id = ?', [doctor_id]);
        return rows;
    }

    static async deleteById(id) {
        const [result] = await db.execute('DELETE FROM schedules WHERE id = ?', [id]);
        return result;
    }
}

module.exports = Schedule;