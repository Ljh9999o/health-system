const express = require('express');
const router = express.Router();

// 定义测试路由
router.get('/test', (req, res) => {
  res.json({ message: 'API is working!' });
});

module.exports = router;