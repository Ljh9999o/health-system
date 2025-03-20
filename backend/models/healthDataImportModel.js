const db = require('../utils/db');
const csv = require('csv-parser');
const fs = require('fs');

class HealthDataImport {
    static async importFromCSV(user_id, filePath) {
        const results = [];
        fs.createReadStream(filePath)
            .pipe(csv())
            .on('data', (data) => results.push(data))
            .on('end', async () => {
                for (const row of results) {
                    await db.execute(
                        'INSERT INTO health_data (user_id, data_type, value, recorded_at) VALUES (?, ?, ?, ?)',
                        [user_id, row.data_type, row.value, row.recorded_at]
                    );
                }
            });
    }
}

module.exports = HealthDataImport;