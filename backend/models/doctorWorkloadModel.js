const db = require('../utils/db');

class DoctorWorkload {
    static async create(workload) {
        const { doctor_id, workload_date, patient_count, service_hours } = workload;
        const [result] = await db.execute(
            'INSERT INTO doctor_workload (doctor_id, workload_date, patient_count, service_hours) VALUES (?, ?, ?, ?)',
            [doctor_id, workload_date, patient_count, service_hours]
        );
        return result;
    }

    static async findByDoctorId(doctor_id) {
        const [rows] = await db.execute('SELECT * FROM doctor_workload WHERE doctor_id = ?', [doctor_id]);
        return rows;
    }

    static async getStatisticsByDoctorId(doctor_id) {
        const [rows] = await db.execute(
            `SELECT workload_date, SUM(patient_count) AS total_patients, SUM(service_hours) AS total_hours
             FROM doctor_workload
             WHERE doctor_id = ?
             GROUP BY workload_date`,
            [doctor_id]
        );
        return rows;
    }
}

module.exports = DoctorWorkload;