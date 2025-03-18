const db = require('../utils/db');

class User {
    static async create(user) {
        const { phone, password, name, gender, birthdate, email } = user;
        const [result] = await db.execute(
            'INSERT INTO users (phone, password, name, gender, birthdate, email) VALUES (?, ?, ?, ?, ?, ?)',
            [phone, password, name, gender, birthdate, email]
        );
        return result;
    }

    static async findByPhone(phone) {
        const [rows] = await db.execute('SELECT * FROM users WHERE phone = ?', [phone]);
        return rows[0];
    }
}

module.exports = User;