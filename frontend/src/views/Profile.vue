<template>
  <div class="profile-container">
    <h2>个人中心</h2>
    <el-form @submit.prevent="handleSubmit">
      <el-form-item label="病例描述">
        <el-input
          v-model="recordForm.content"
          type="textarea"
          placeholder="请输入病例描述"
          :rows="4"
        />
      </el-form-item>
      <el-button type="primary" native-type="submit">提交病例</el-button>
    </el-form>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import axios from 'axios';
import { ElMessage } from 'element-plus';

const recordForm = ref({
  content: ''
});

const handleSubmit = async () => {
  try {
    await axios.post('/api/medical/records', {
      user_id: 1, // 从登录信息中获取实际用户ID
      record: recordForm.value.content
    });
    ElMessage.success('病例提交成功！');
    recordForm.value.content = ''; // 清空输入
  } catch (error) {
    ElMessage.error(`提交失败：${error.response?.data.message || '未知错误'}`);
  }
};
</script>

<style scoped>
.profile-container {
  width: 600px;
  margin: 20px auto;
}
</style>

<script>
export default {
  name: 'UserProfile'
}
</script>