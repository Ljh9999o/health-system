const express = require('express');
const reviewController = require('../controllers/reviewController');
const router = express.Router();

// 创建评价
router.post('/', reviewController.createReview);

// 查询医生的评价
router.get('/:doctor_id', reviewController.getReviewsByDoctorId);

// 查询用户的评价历史
router.get('/user/:user_id', reviewController.getReviewsByUserId);

// 删除评价
router.delete('/:id', reviewController.deleteReview);

module.exports = router;