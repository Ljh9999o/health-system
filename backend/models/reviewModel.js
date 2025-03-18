const db = require('../utils/db');

class Review {
    static async create(review) {
        const { user_id, doctor_id, rating, comment } = review;
        const [result] = await db.execute(
            'INSERT INTO reviews (user_id, doctor_id, rating, comment) VALUES (?, ?, ?, ?)',
            [user_id, doctor_id, rating, comment]
        );
        return result;
    }

    static async findByDoctorId(doctor_id) {
        const [rows] = await db.execute('SELECT * FROM reviews WHERE doctor_id = ?', [doctor_id]);
        return rows;
    }

    static async deleteById(id) {
        const [result] = await db.execute('DELETE FROM reviews WHERE id = ?', [id]);
        return result;
    }
}

module.exports = Review;