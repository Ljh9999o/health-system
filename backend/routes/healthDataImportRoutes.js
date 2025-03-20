const express = require('express');
const multer = require('multer');
const healthDataImportController = require('../controllers/healthDataImportController');

const upload = multer({ dest: 'uploads/' });
const router = express.Router();

// 导入健康数据
router.post('/:user_id/csv', upload.single('file'), healthDataImportController.importFromCSV);

module.exports = router;