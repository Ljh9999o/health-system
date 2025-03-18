const MedicalRecord = require('../models/medicalRecordModel');

const medicalRecordController = {
    // 添加病例
    async addRecord(req, res) {
        try {
            const { user_id, record } = req.body;
            const result = await MedicalRecord.create({ user_id, record });
            res.status(201).json({ message: '病例添加成功', result });
        } catch (error) {
            res.status(500).json({ message: '病例添加失败', error });
        }
    },

    // 查询用户病例
    async getRecordsByUserId(req, res) {
        try {
            const { user_id } = req.params;
            const records = await MedicalRecord.findByUserId(user_id);
            res.status(200).json({ message: '查询成功', records });
        } catch (error) {
            res.status(500).json({ message: '查询失败', error });
        }
    }
};

module.exports = medicalRecordController;