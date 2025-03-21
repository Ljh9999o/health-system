<template>
  <div class="profile-container">
    <!-- 用户信息卡片 -->
    <el-card class="user-card">
      <div class="user-header">
        <h2>欢迎回来，{{ user.name }}</h2>
        <div class="user-meta">
          <span class="points">积分：{{ user.points }}</span>
          <el-button type="primary" @click="goToHealthPlan">查看健康计划</el-button>
        </div>
      </div>
    </el-card>

    <!-- 病例管理模块 -->
    <el-card class="section-card">
      <template #header>
        <div class="section-title">
          <i class="el-icon-document"></i>
          <span>病例管理</span>
        </div>
      </template>
      <el-form @submit.prevent="handleSubmit">
        <el-form-item>
          <el-input
            v-model="recordForm.content"
            type="textarea"
            :rows="4"
            placeholder="请输入病例描述（如：2023年10月体检报告，血压正常）"
          />
        </el-form-item>
        <el-button type="primary" native-type="submit">提交病例</el-button>
      </el-form>
    </el-card>

    <!-- 健康计划概览 -->
    <el-card class="section-card">
      <template #header>
        <div class="section-title">
          <i class="el-icon-date"></i>
          <span>近期健康计划</span>
        </div>
      </template>
      <el-button type="primary" @click="router.push('/health-plans')">查看全部计划</el-button>
      <el-table :data="plans" style="width: 100%">
        <el-table-column prop="plan_name" label="计划名称" width="300" />

        <el-table-column prop="start_date" label="开始日期">
          <template #default="{ row }">
            {{ formatDate(row.start_date) }}
          </template>
        </el-table-column>

        <el-table-column prop="end_date" label="结束日期">
          <template #default="{ row }">
            {{ formatDate(row.end_date) }}
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>


<script>
export default {
  name: 'UserProfile' // 修改为多单词名称
}
</script>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import { ElMessage } from 'element-plus';
import { useRouter } from 'vue-router';
import dayjs from 'dayjs';

const router = useRouter();

// 日期格式化函数
const formatDate = (date) => {
  return dayjs(date).format('YYYY-MM-DD');
};

// 用户信息（临时模拟数据，实际应从登录后获取）
const user = ref({
  id: 1,
  name: '张三',
  points: 100
});

// 病例表单
const recordForm = ref({
  content: ''
});

// 健康计划列表
const plans = ref([]);

// 提交病例
const handleSubmit = async () => {
  try {
    await axios.post('/api/medical/records', {
      user_id: user.value.id,
      record: recordForm.value.content
    });
    ElMessage.success('病例提交成功！');
    recordForm.value.content = '';
  } catch (error) {
    ElMessage.error(`提交失败：${error.response?.data.message || '未知错误'}`);
  }
};

// 获取健康计划
const fetchPlans = async () => {
  try {
    const res = await axios.get(`/api/health-plans/${user.value.id}`);
    plans.value = res.data.plans;
  } catch (error) {
    ElMessage.error(`获取计划失败：${error.response?.data.message || '未知错误'}`);
  }
};

// 跳转到健康计划页
const goToHealthPlan = () => {
  router.push('/health-plans');
};

// 初始化加载数据
onMounted(() => {
  fetchPlans();
});
</script>

<style lang="scss" scoped>
.profile-container {
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;

  .user-card {
    margin-bottom: 20px;
    .user-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      h2 {
        color: #2c3e50;
        margin: 0;
      }
      .user-meta {
        .points {
          color: #e6a23c;
          margin-right: 20px;
          font-weight: bold;
        }
      }
    }
  }

  .section-card {
    margin-bottom: 20px;
    .section-title {
      display: flex;
      align-items: center;
      i {
        margin-right: 8px;
        color: #409eff;
      }
      span {
        font-size: 16px;
        font-weight: 500;
      }
    }
    .el-form {
      padding: 0 20px;
      .el-button {
        width: 150px;
      }
    }
  }
}
</style>