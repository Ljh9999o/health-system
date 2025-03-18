const db = require('../utils/db');

class Point {
    static async addPoints(user_id, points) {
        const [result] = await db.execute(
            'INSERT INTO points (user_id, points) VALUES (?, ?)',
            [user_id, points]
        );
        return result;
    }

    static async getTotalPoints(user_id) {
        const [rows] = await db.execute(
            'SELECT SUM(points) AS total_points FROM points WHERE user_id = ?',
            [user_id]
        );
        return rows[0].total_points || 0;
    }
}

module.exports = Point;