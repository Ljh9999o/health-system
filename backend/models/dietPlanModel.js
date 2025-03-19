const db = require('../utils/db');

class DietPlan {
    static async create(plan) {
        const { user_id, plan_name, description, start_date, end_date } = plan;
        const [result] = await db.execute(
            'INSERT INTO diet_plans (user_id, plan_name, description, start_date, end_date) VALUES (?, ?, ?, ?, ?)',
            [user_id, plan_name, description, start_date, end_date]
        );
        return result;
    }

    static async findByUserId(user_id) {
        const [rows] = await db.execute('SELECT * FROM diet_plans WHERE user_id = ?', [user_id]);
        return rows;
    }

    static async deleteById(id) {
        const [result] = await db.execute('DELETE FROM diet_plans WHERE id = ?', [id]);
        return result;
    }
}

module.exports = DietPlan;