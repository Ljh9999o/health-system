const db = require('../utils/db');

class Reminder {
    static async create(reminder) {
        const { user_id, reminder_type, reminder_date, message } = reminder;
        const [result] = await db.execute(
            'INSERT INTO reminders (user_id, reminder_type, reminder_date, message) VALUES (?, ?, ?, ?)',
            [user_id, reminder_type, reminder_date, message]
        );
        return result;
    }

    static async findByUserId(user_id) {
        const [rows] = await db.execute('SELECT * FROM reminders WHERE user_id = ?', [user_id]);
        return rows;
    }

    static async deleteById(id) {
        const [result] = await db.execute('DELETE FROM reminders WHERE id = ?', [id]);
        return result;
    }
}

module.exports = Reminder;