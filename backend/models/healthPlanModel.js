const db = require('../utils/db');

class HealthPlan {
    static async create(plan) {
        const { user_id, plan_name, description, start_date, end_date } = plan;
        try {
          const [result] = await db.execute(
            'INSERT INTO health_plans (user_id, plan_name, description, start_date, end_date) VALUES (?, ?, ?, ?, ?)',
            [user_id, plan_name, description, start_date, end_date]
          );
          return result;
        } catch (error) {
          throw error;
        }
    }

    static async findByUserId(user_id) {
        const [rows] = await db.execute('SELECT * FROM health_plans WHERE user_id = ?', [user_id]);
        return rows;
    }

    static async deleteById(id) {
        const [result] = await db.execute('DELETE FROM health_plans WHERE id = ?', [id]);
        return result;
    }
}

module.exports = HealthPlan;