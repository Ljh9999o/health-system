const HealthDataImport = require('../models/healthDataImportModel');

const healthDataImportController = {
    async importFromCSV(req, res) {
        try {
            const { user_id } = req.params;
            const filePath = req.file.path;
            await HealthDataImport.importFromCSV(user_id, filePath);
            res.status(200).json({ message: '数据导入成功' });
        } catch (error) {
            res.status(500).json({ message: '数据导入失败', error });
        }
    }
};

module.exports = healthDataImportController;