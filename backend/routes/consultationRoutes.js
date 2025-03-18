const express = require('express');
const consultationController = require('../controllers/consultationController');

const router = express.Router();

// 用户提问
router.post('/questions', consultationController.addQuestion);

// 查询用户提问
router.get('/questions/:user_id', consultationController.getQuestionsByUserId);

// 管理员回答问题
router.put('/questions/:id/answer', consultationController.answerQuestion);

module.exports = router;