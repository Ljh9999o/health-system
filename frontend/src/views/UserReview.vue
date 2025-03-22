<template>
    <div class="review-container">
      <!-- 评价表单 -->
      <el-card class="review-form">
        <el-form :model="newReview" label-width="100px">
          <el-form-item label="医生ID" required>
            <el-input-number v-model="newReview.doctor_id" :min="1" />
          </el-form-item>
          <el-form-item label="评分" required>
            <el-rate v-model="newReview.rating" :max="5" />
          </el-form-item>
          <el-form-item label="评价内容">
            <el-input v-model="newReview.comment" type="textarea" :rows="3" />
          </el-form-item>
          <el-button type="primary" @click="submitReview">提交评价</el-button>
        </el-form>
      </el-card>
  
      <!-- 评价列表 -->
      <el-card class="review-list">
        <el-table :data="reviews">
          <el-table-column prop="doctor_id" label="医生ID" />
          <el-table-column label="评分">
            <template #default="{ row }">
              <el-rate :model-value="row.rating" :max="5" disabled />
            </template>
          </el-table-column>
          <el-table-column prop="comment" label="评价内容" />
          <el-table-column prop="created_at" label="提交时间">
            <template #default="{ row }">
              {{ formatDate(row.created_at) }}
            </template>
          </el-table-column>
        </el-table>
      </el-card>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import axios from 'axios';
  import { ElMessage } from 'element-plus';
  import dayjs from 'dayjs';
  
  const newReview = ref({
    doctor_id: 1,
    rating: 5,
    comment: ''
  });
  
  const formatDate = (date) => {
  return dayjs(date).format('YYYY-MM-DD HH:mm:ss');
  };

  const reviews = ref([]);
  
  // 提交评价
  const submitReview = async () => {
    try {
      const user_id = localStorage.getItem('user_id');
      await axios.post('/api/reviews', {
        user_id,
        ...newReview.value
      });
      ElMessage.success('评价提交成功');
      fetchReviews();
    } catch (error) {
      ElMessage.error(`提交失败：${error.response?.data.message || '未知错误'}`);
    }
  };
  
  // 获取用户的历史评价
  const fetchReviews = async () => {
    try {
      const user_id = localStorage.getItem('user_id');
      const res = await axios.get(`/api/reviews/user/${user_id}`);
      reviews.value = res.data.reviews;
    } catch (error) {
      ElMessage.error(`获取评价失败：${error.message}`);
    }
  };
  
  onMounted(() => {
    fetchReviews();
  });
  
  </script>
  


  <style scoped>
  .review-container {
    padding: 20px;
    max-width: 1200px;
    margin: 0 auto;
  }
  .review-form {
    margin-bottom: 20px;
  }
  </style>