const db = require('../utils/db');

class PerformanceEvaluation {
    static async getEvaluationData(doctor_id) {
        const [rows] = await db.execute(
            `SELECT workload_date, patient_count, service_hours
             FROM doctor_workload
             WHERE doctor_id = ?
             ORDER BY workload_date`,
            [doctor_id]
        );
        return rows;
    }
}

module.exports = PerformanceEvaluation;