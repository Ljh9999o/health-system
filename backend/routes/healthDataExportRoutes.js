const express = require('express');
const healthDataExportController = require('../controllers/healthDataExportController');

const router = express.Router();

// 导出健康数据为 CSV
router.get('/:user_id/csv', healthDataExportController.exportToCSV);

// 导出健康数据为 Excel
router.get('/:user_id/excel', healthDataExportController.exportToExcel);

module.exports = router;