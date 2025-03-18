const db = require('../utils/db');

class Announcement {
    static async create(announcement) {
        const { title, content } = announcement;
        const [result] = await db.execute(
            'INSERT INTO announcements (title, content) VALUES (?, ?)',
            [title, content]
        );
        return result;
    }

    static async findAll() {
        const [rows] = await db.execute('SELECT * FROM announcements ORDER BY created_at DESC');
        return rows;
    }

    static async deleteById(id) {
        const [result] = await db.execute('DELETE FROM announcements WHERE id = ?', [id]);
        return result;
    }
}

module.exports = Announcement;