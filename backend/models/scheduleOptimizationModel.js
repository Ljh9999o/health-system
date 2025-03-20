const db = require('../utils/db');

class ScheduleOptimization {
    static async optimizeSchedule(doctor_id) {
        const [rows] = await db.execute(
            `SELECT schedule_date, start_time, end_time
             FROM schedules
             WHERE doctor_id = ?
             ORDER BY schedule_date`,
            [doctor_id]
        );
        return rows;
    }
}

module.exports = ScheduleOptimization;